const Appointment = require("../models/Appointment");

class AppointmentService {
  // Créer un rendez-vous
  async createAppointment(data) {
    console.log("APPOINTEMENT_DATA", data);
    try {
      const appointment = new Appointment(data);
      return await appointment.save();
    } catch (error) {
      throw new Error(`Error creating appointment: ${error.message}`);
    }
  }

  async addMechanicToAppointment(appointmentId, mechanicId) {
    try {
      return await Appointment.findByIdAndUpdate(
        appointmentId,
        { $addToSet: { mechanicIds: mechanicId } },
        { new: true }
      ).populate("clientId vehicleId mechanicIds");
    } catch (error) {
      throw new Error(`Error adding mechanic: ${error.message}`);
    }
  }

  // Récupérer un rendez-vous par ID
  async getAppointmentById(id) {
    try {
      return await Appointment.findById(id).populate(
        "clientId vehicleId mechanicIds"
      );
    } catch (error) {
      throw new Error(`Error fetching appointment: ${error.message}`);
    }
  }

  // Récupérer tous les rendez-vous d'un client
  async getAppointmentsByClient(clientId) {
    try {
      return await Appointment.find({ clientId }).populate(
        "vehicleId mechanicIds"
      );
    } catch (error) {
      throw new Error(`Error fetching client's appointments: ${error.message}`);
    }
  }

  // Récupérer tous les rendez-vous d'un mécanicien
  async getAppointmentsByMechanic(mechanicId) {
    try {
      return await Appointment.find({ mechanicIds: mechanicId }).populate(
        "clientId vehicleId"
      );
    } catch (error) {
      throw new Error(
        `Error fetching mechanic's appointments: ${error.message}`
      );
    }
  }

  // Mettre à jour un rendez-vous
  async updateAppointment(id, data) {
    try {
      return await Appointment.findByIdAndUpdate(id, data, {
        new: true,
      }).populate("clientId vehicleId mechanicIds");
    } catch (error) {
      throw new Error(`Error updating appointment: ${error.message}`);
    }
  }

  // Supprimer un rendez-vous
  async deleteAppointment(id) {
    try {
      return await Appointment.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting appointment: ${error.message}`);
    }
  }
}

module.exports = new AppointmentService();
