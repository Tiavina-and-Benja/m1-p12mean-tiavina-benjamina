const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

const authenticateToken = require("../middlewares/authMiddleware");
const authorizeProfils = require("../middlewares/roleMiddleware");

router.get("", authenticateToken, serviceController.getPaginatedService);
router.post("", authenticateToken, authorizeProfils(['manager']), serviceController.createService);
router.put("/:serviceId", authenticateToken, authorizeProfils(['manager']), serviceController.updateService);
router.delete("/:serviceId", authenticateToken, authorizeProfils(['manager']), serviceController.deleteService);
module.exports = router;
