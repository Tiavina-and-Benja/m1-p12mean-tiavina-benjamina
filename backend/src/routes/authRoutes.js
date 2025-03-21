const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const authenticateToken = require("../middlewares/authMiddleware");
const authorizeProfils = require("../middlewares/roleMiddleware");

router.post("/register", (req, res, next) =>
  authController.register(req, res, next)
);

router.post("/login", (req, res, next) => authController.login(req, res, next));

router.post(
  "/register/mecanicien",
  authenticateToken,
  authorizeProfils(["manager"]),
  (req, res, next) => {
    req.body.profil = "mecanicien";
    authController.register(req, res, next);
  }
);

router.post("/login/mecanicien", (req, res, next) =>
  authController.login(req, res, next, "mecanicien")
);

router.post(
  "/register/manager",
  authenticateToken,
  authorizeProfils(["manager"]),
  (req, res, next) => {
    req.body.profil = "manager";
    authController.register(req, res, next);
  }
);

router.post("/login/manager", (req, res, next) =>
  authController.login(req, res, next, "manager")
);

module.exports = router;
