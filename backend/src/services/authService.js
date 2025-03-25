const User = require("../models/User");
const { hashPassword } = require("../utils/hash");
const { getEnv } = require("../config/env");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ERROR } = require("../errors/errors");
const userService = require("./userService");

class AuthService {
  /**
   * Enregistre un nouvel utilisateur dans la base de données.
   *
   * @param {Object} userData - Données de l'utilisateur.
   * @param {string} userData.first_name - Prénom de l'utilisateur.
   * @param {string} userData.last_name - Nom de famille de l'utilisateur.
   * @param {string} userData.email - Adresse e-mail de l'utilisateur.
   * @param {string} userData.phone - Numéro de téléphone de l'utilisateur.
   * @param {string} userData.password - Mot de passe de l'utilisateur (sera hashé).
   * @param {string} profil - Profil de l'utilisateur (ex: "user", "mecanicien", "manager").
   *
   * @returns {Promise<void>} - Ne retourne rien en cas de succès, lève une erreur sinon.
   */
  async register({ first_name, last_name, email, phone, password }, profil) {
    const hashedPassword = await hashPassword(password);
    const user = new User({
      first_name,
      last_name,
      email,
      phone,
      password: hashedPassword,
      profil,
    });
    await userService.createUser(user);
  }

  async login({ email, password }, profil) {
    const user = await userService.findOneUser({ email, profil: profil });
    if (!user)
      throw ERROR.NOT_FOUND("Erreur de validation", "user_not_found", {
        email: "Utilisateur non trouvé",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw ERROR.NOT_AUTHORIZED("Erreur de validation", "wrong_password", {
        password: "Mot de passe erroné",
      });

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
      user: userData,
    };
  }

  async checkToken(token) {
    if (!token) throw ERROR.NOT_AUTHORIZED();
    try {
      const verified = jwt.verify(token, getEnv("JWT_SECRET"));
      return verified;
    } catch (error) {
      throw ERROR.FORBIDDEN();
    }
  }

  async getUser(token) {
    return jwt.decode(token);
  }
}

module.exports = new AuthService()