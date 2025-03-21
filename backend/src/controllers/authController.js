const AuthService = require("../services/authService");

exports.register = async (req, res, next) => {
  const { first_name, last_name, email, phone, password, profil } = req.body;
  try {
    const result = await AuthService.register({
      first_name,
      last_name,
      email,
      phone,
      password
    }, profil);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next, profil = 'user') => {
  const { email, password } = req.body;

  try {
    const result = await AuthService.login({ email, password }, profil);
    const responseData = {
      message: "Connexion effectuée avec succés",
      ...result
    }
    return res.status(200).json(responseData);
  } catch (error) {
    next(error);
  }
};