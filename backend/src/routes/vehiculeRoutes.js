const express = require("express");
const router = express.Router();
const vehiculeController = require("../controllers/vehiculeController");
const authenticateToken = require("../middlewares/authMiddleware");
const authorizeProfils = require("../middlewares/roleMiddleware");

router.get("/", authenticateToken, vehiculeController.getVehicules);
router.get("/:id", authenticateToken, vehiculeController.getVehiculeById);
router.post("/", authenticateToken, authorizeProfils(["manager"]), vehiculeController.addVehicule);
router.put("/:id", authenticateToken, authorizeProfils(["manager"]), vehiculeController.updateVehicule);
router.delete("/:id", authenticateToken, authorizeProfils(["manager"]), vehiculeController.deleteVehicule);

module.exports = router;