 const User = require("@models/User");
const hash = require("@utils/hash");
const { getEnv } = require("@config/env");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ERROR } = require("@errors/errors");

exports.register = async ({
  first_name,
  last_name,
  email,
  phone,
  password,
  profil,
}) => {
  const hashedPassword = await hash.hashPassword(password);
  const user = new User({
    first_name,
    last_name,
    email,
    phone,
    password: hashedPassword,
    profil,
  });
  const userExist = await User.findOne({ email: user.email, profil: user.profil });
  if (userExist) throw ERROR.RESOURCE_ALREADY_EXISTS("Erreur de validation", "user_already_exist", {email: "L'email est déjà utilisé"});

  await user.save();

  return user;
};

exports.login = async ({ email, password, profil }) => {
  const user = await User.findOne({ email, profil });
  if (!user) throw ERROR.NOT_FOUND("Erreur de validation", "user_not_found", {email: "Utilisateur non trouvé"});

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw ERROR.NOT_AUTHORIZED("Erreur de validation", "wrong_password", {password: "Mot de passe erroné"});

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
  if (!token) throw ERROR.NOT_AUTHORIZED();
  try {
    const verified = jwt.verify(token, getEnv("JWT_SECRET"));
    return verified;
  } catch (error) {
    throw ERROR.FORBIDDEN();
  }
};
