const Appointment = require("../models/Appointment");
const MyError = require("../errors/MyError");
const { ERROR } = require("../errors/errors");

const paymentMiddleware = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;
    const { isPaid } = req.body; // Vérification de isPaid depuis le corps de la requête

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      throw new MyError("Appointment not found", 404);
    }

    if (appointment.status !== "completed") {
      throw ERROR.BAD_REQUEST(message="Le rendez-vous doit d'abord être effectué", 'appointment_not_completed');
    }

    if (typeof isPaid !== "boolean") {
      return res.status(400).json({ message: "Le champ isPaid doit être un booléen." });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = paymentMiddleware;
