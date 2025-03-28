const appointmentService = require("../services/appointmentService");
const authService = require("../services/authService");
const serviceService = require("../services/serviceService");

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
    // const serviceIndex = appointment.services.findIndex(s => s._id.toString() === serviceId);
    // if (serviceIndex === -1) {
    //   return res.status(404).json({ message: "Service not found in appointment" });
    // }

    // Mettre à jour le statut du service
    appointment.services[serviceId].status = status;

    // Sauvegarder l'appointment mis à jour
    const updatedAppointment = await appointmentService.updateAppointment(appointmentId, {
      services: appointment.services
    });

    res.status(200).json(updatedAppointment);
  } catch (error) {
    next(error);
  }
};
