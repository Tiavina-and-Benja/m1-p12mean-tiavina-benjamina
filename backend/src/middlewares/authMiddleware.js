const { checkToken } = require("@services/authService");
const MyError = require("@errors/MyError");

// Vérifie si le token JWT est valide
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
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

module.exports = authenticateToken;
