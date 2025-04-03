const appointmentService = require("../services/appointmentService");
const authService = require("../services/authService");
const serviceService = require("../services/serviceService");


exports.getAppointmentById = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  const appointmentId = req.params.appointmentId;
  try {
    const appointments = await appointmentService.getAppointmentById(
      appointmentId
    );
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};


exports.getAppointmentByClient = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  const clientId = await authService.getUser(token);
  try {
    const appointments = await appointmentService.getAppointmentsByClient(
      clientId
    );
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

exports.createAppointment = async (req, res, next) => {
  // TODO: include vehicles
  const { date, time, services } = req.body;
  const token = req.header("Authorization")?.split(" ")[1];
  const clientId = (await authService.getUser(token)).id;

  try {
    const appointment = await appointmentService.createAppointment({
      clientId,
      // TODO: include later
      // vehicleId,
      date,
      time,
      services: await serviceService.findServicesByIds(services),
    });
    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};

exports.addMechanicToAppointment = async (req, res, next) => {
  const { appointmentId, mechanicId } = req.body;
  try {
    const appointment = await appointmentService.addMechanicToAppointment(
      appointmentId,
      mechanicId
    );
    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};

exports.validateAppointment = async (req, res, next) => {
  const { appointmentId } = req.params;
  try {
    const appointment = await appointmentService.updateAppointment(
      appointmentId,
      {
        status: "in progress",
      }
    );
    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};

exports.cancelAppointment = async (req, res, next) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await appointmentService.updateAppointment(
      appointmentId,
      {
        status: "canceled",
      }
    );
    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};

exports.updateServiceStatusInAppointment = async (req, res, next) => {
  const { appointmentId, serviceId } = req.params;
  const { status } = req.body; // `status` doit être "pending", "in progress" ou "completed"

  try {
    const appointment = await appointmentService.getAppointmentById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Trouver le service à mettre à jour
    // TODO: decommenter au cas ou on utilise serviceId au lieu de l'index
    // const serviceIndex = appointment.services.findIndex(s => s._id.toString() === serviceId);
    // if (serviceIndex === -1) {
    //   return res.status(404).json({ message: "Service not found in appointment" });
    // }

    // Sauvegarder l'appointment mis à jour
    const updatedAppointment = await appointmentService.updateServiceStatus(appointmentId, serviceId, status);

    res.status(200).json(updatedAppointment);
  } catch (error) {
    next(error);
  }
};


exports.getEstimate = async (req, res) => {
  try {
      const { appointmentId } = req.params;

      const estimate = await appointmentService.getEstimate(appointmentId);

      res.json(estimate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.markAsPaid = async (req, res, next) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await appointmentService.getAppointmentById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.status !== "completed") {
      return res.status(400).json({ message: "Appointment must be completed before marking it as paid" });
    }

    const updatedAppointment = await appointmentService.updateAppointment(appointmentId, { isPaid: true });

    res.status(200).json({
      message: "Appointment marked as paid successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    next(error);
  }
};
