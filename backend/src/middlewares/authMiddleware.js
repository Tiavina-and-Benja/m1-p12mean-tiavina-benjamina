const jwt = require("jsonwebtoken");
const { getEnv } = require("../config/env");
const { checkToken } = require("../services/authService");
const MyError = require("../errors/MyError");

// Vérifie si le token JWT est valide
exports.authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("TOKEN", token);
  if (!token) return res.status(401).json({ message: "Accès refusé" });

  checkToken(token)
    .then((result) => {
      req.user = result;
      next();
    })
    .catch((err) => {
      if (err instanceof MyError) {
        res.status(err.statusCode).json({ message: err.message });
      } else {
        next(err);
      }
    });
};

// Vérifie si le rôle de l'utilisateur est autorisé
exports.authorizeProfils = (profils) => {
  return (req, res, next) => {
    if (!profils.includes(req.user.profil)) {
      return res.status(403).json({ message: "Accès interdit" });
    }
    next();
  };
};
