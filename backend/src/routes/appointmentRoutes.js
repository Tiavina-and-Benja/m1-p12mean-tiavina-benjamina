const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointmentController");

const authenticateToken = require("../middlewares/authMiddleware");
const authorizeProfils = require("../middlewares/roleMiddleware");

router.get("", authenticateToken, authorizeProfils(['user', 'manager']), appointmentController.getAppointmentByClient);
router.post("", authenticateToken, authorizeProfils(['user']), appointmentController.createAppointment);
router.get("/:appointmentId", authenticateToken, appointmentController.getAppointmentById);
router.put("/:appointmentId/validate", authenticateToken, authorizeProfils(['manager']), appointmentController.validateAppointment);
router.put("/:appointmentId/cancel", authenticateToken, authorizeProfils(['manager']), appointmentController.cancelAppointment);
router.put("/:appointmentId/services/:serviceId/status", authenticateToken, authorizeProfils(["manager", "user"]), appointmentController.updateServiceStatusInAppointment);

module.exports = router;
