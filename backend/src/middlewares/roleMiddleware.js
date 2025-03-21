// Vérifie si le rôle de l'utilisateur est autorisé
const authorizeProfils = (profils) => {
  return (req, res, next) => {
    if (!profils.includes(req.user.profil)) {
      return res.status(403).json({ message: "Accès interdit" });
    }
    next();
  };
};

module.exports = authorizeProfils;
