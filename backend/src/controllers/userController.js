const userService = require('../services/userService');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Appel du service pour créer un utilisateur
    const user = await userService.createUser(name, email, password);

    res.status(201).json({ message: 'Utilisateur enregistré avec succés', user });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { email } = req.params;

    // Appel du service pour récupérer un utilisateur
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json(user);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};
