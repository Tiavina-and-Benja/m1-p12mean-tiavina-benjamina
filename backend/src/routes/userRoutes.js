const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const authenticateToken = require("../middlewares/authMiddleware");
const authorizeProfils = require("../middlewares/roleMiddleware");

router.get(
  "/mecaniciens",
  authenticateToken,
  authorizeProfils(["manager"]),
  (req, res, next) => {
    req.query.profil = "mecanicien";
    userController.getUsers(req, res, next);
  }
);

router.post(
  "/mecaniciens",
  authenticateToken,
  authorizeProfils(["manager"]),
  (req, res, next) => {
    req.body.profil = "mecanicien";
    userController.addUser(req, res, next);
  }
);

module.exports = router;
