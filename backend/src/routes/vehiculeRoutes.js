const express = require("express");
const router = express.Router();
const vehiculeController = require("../controllers/vehiculeController");
const authenticateToken = require("../middlewares/authMiddleware");
const authorizeProfils = require("../middlewares/roleMiddleware");

router.get("/", authenticateToken, vehiculeController.getVehicules);
router.get("/:id", authenticateToken, vehiculeController.getVehiculeById);
router.post("/", authenticateToken, authorizeProfils(["user"]), vehiculeController.addVehicule);
router.put("/:id", authenticateToken, authorizeProfils(["user"]), vehiculeController.updateVehicule);
// router.delete("/:id", authenticateToken, authorizeProfils(["user"]), vehiculeController.deleteVehicule);

module.exports = router;