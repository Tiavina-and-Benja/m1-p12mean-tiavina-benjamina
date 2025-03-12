const User = require("../models/User");
const hash = require("../utils/hash");
const { getEnv } = require("../config/env");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ERROR } = require("../errors/errors");

exports.register = async ({
  first_name,
  last_name,
  email,
  phone,
  password,
  profil,
}) => {
  const userExist = await User.findOne({ email });
  if (userExist) throw new Error("Utilisateur déjà enregistré");

  const hashedPassword = await hash.hashPassword(password);
  const user = new User({
    first_name,
    last_name,
    email,
    phone,
    password: hashedPassword,
    profil,
  });
  await user.save();

  return user;
};

exports.login = async ({ email, password, profil }) => {
  const user = await User.findOne({ email });
  if (!user) throw ERROR.NOT_FOUND("Utilisateur non trouvé");

  if (user.profil !== profil) throw ERROR.FORBIDDEN;

  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) throw ERROR.NOT_AUTHORIZED("Mot de passe est incorrect");

  const userData = user.toObject();
  delete userData.password;

  return {
    token: jwt.sign(
      { id: user._id, profil: user.profil },
      getEnv("JWT_SECRET"),
      {
        expiresIn: getEnv("TOKEN_EXPIRATION"),
      }
    ),
    user: userData
  };
};

exports.checkToken = async (token) => {
  if (!token) throw ERROR.NOT_AUTHORIZED;
  try {
    const verified = jwt.verify(token, getEnv("JWT_SECRET"));
    return verified;
  } catch (error) {
    throw ERROR.FORBIDDEN;
  }
};
