const Appointment = require("../models/Appointment");
const MyError = require("../errors/MyError");

const paymentMiddleware = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;
    const { isPaid } = req.body; // Vérification de isPaid depuis le corps de la requête

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      throw new MyError("Appointment not found", 404);
    }

    if (appointment.status !== "completed") {
      throw new MyError("L'appointment doit être complété avant d'être payé.", 400);
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
