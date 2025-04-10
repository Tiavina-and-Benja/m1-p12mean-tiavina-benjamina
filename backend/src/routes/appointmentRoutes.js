const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointmentController");

const paymentMiddleware = require("../middlewares/paymentMiddleware");

const authenticateToken = require("../middlewares/authMiddleware");
const authorizeProfils = require("../middlewares/roleMiddleware");

router.get("", authenticateToken, authorizeProfils(['user', 'manager']), appointmentController.getAppointmentByClient);
router.get("/all", authenticateToken, authorizeProfils(['manager']), appointmentController.getAllAppointments);
router.get("/mecaniciens", authenticateToken, authorizeProfils(['mecanicien']), appointmentController.getAppointmentByMecanicien);
router.get("", authenticateToken, authorizeProfils(['manager']), appointmentController.getAppointmentByClient);
router.post("", authenticateToken, authorizeProfils(['user']), appointmentController.createAppointment);
router.get("/:appointmentId", authenticateToken, appointmentController.getAppointmentById);

// router.put("/:appointmentId/validate", authenticateToken, authorizeProfils(['manager']), appointmentController.validateAppointment);
// router.put("/:appointmentId/cancel", authenticateToken, authorizeProfils(['manager']), appointmentController.cancelAppointment);
// router.put("/:appointmentId/services/:serviceId/status", authenticateToken, authorizeProfils(["manager", "mecanicien"]), appointmentController.updateServiceStatusInAppointment);

router.put("/:appointmentId/validate", authenticateToken, authorizeProfils(["manager", "user"]),appointmentController.validateAppointment);
router.put("/:appointmentId/cancel", authenticateToken, authorizeProfils(["manager", "user"]),appointmentController.cancelAppointment);
router.put("/:appointmentId/add-mechanics", authenticateToken, authorizeProfils(["manager"]),appointmentController.addMechanicsToAppointment);
router.put("/:appointmentId/services/:serviceId/status", authenticateToken, authorizeProfils(["mecanicien"]), appointmentController.updateServiceStatusInAppointment);


router.get('/estimate/:appointmentId', appointmentController.getEstimate);

router.put("/:appointmentId/pay", authenticateToken, authorizeProfils(["manager"]), paymentMiddleware, appointmentController.markAsPaid );

router.put("/:appointmentId/services/:serviceId/add-part", authenticateToken, authorizeProfils(["mecanicien"]), appointmentController.addPartToService);
  
router.post("/:appointmentId/messages", appointmentController.addMessage);

module.exports = router;
