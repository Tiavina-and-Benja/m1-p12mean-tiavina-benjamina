const User = require("../models/User");
const bcrypt = require("bcrypt");

// Service pour créer un utilisateur
exports.createUser = async (name, email, password) => {
  // Vérifier si l'utilisateur existe déjà
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hacher le mot de passe avant de le sauvegarder
  const hashedPassword = await bcrypt.hash(password, 10);

  // Créer et enregistrer l'utilisateur
  const newUser = new User({ name, email, password: hashedPassword });
  return await newUser.save();
};

// Service pour récupérer un utilisateur par email
exports.getUserByEmail = async (email) => {
  return await User.findOne({ email });
};
