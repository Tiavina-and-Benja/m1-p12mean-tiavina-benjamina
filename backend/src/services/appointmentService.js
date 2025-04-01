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
  // async updateAppointment(id, data) {
  //   try {
  //     return await Appointment.findByIdAndUpdate(id, data, {
  //       new: true,
  //     }).populate("clientId vehicleId mechanicIds");
  //   } catch (error) {
  //     throw new Error(`Error updating appointment: ${error.message}`);
  //   }
  // }

  async updateAppointment(id, data) {
    try {
      // Récupérer le rendez-vous actuel
      const appointment = await Appointment.findById(id);

      if (!appointment) {
        throw new Error("Appointment not found");
      }
  
      // Si l'update inclut des services, on met à jour
      if (data.services) {
        appointment.services = data.services;
      }
  
      // Vérifier si tous les services sont terminés
      const allServicesCompleted = appointment.services.every(
        (service) => service.status === "completed"
      );
  
      // Mettre à jour le statut du rendez-vous si tous les services sont complétés
      if (allServicesCompleted) {
        appointment.status = "completed";
      }
  
      // Appliquer les autres mises à jour fournies
      Object.assign(appointment, data);

      // Sauvegarder et retourner l'appointment mis à jour
      return await appointment.save();
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

  async updateServiceStatus(appointmentId, serviceId, newStatus) {
    try {
      const validStatuses = ["pending", "in progress", "completed"];
      if (!validStatuses.includes(newStatus)) {
        throw new Error("Statut de service invalide.");
      }
  
      const appointment = await Appointment.findById(appointmentId);
      if (!appointment) {
        throw new Error("Rendez-vous non trouvé.");
      }
  
      // Trouver le service par ID
      const service = appointment.services.find(s => s._id.toString() === serviceId);
      if (!service) {
        throw new Error("Service non trouvé dans le rendez-vous.");
      }
  
      // Mettre à jour le statut du service
      service.status = newStatus;
  
      // Vérifier si tous les services sont terminés
      const allCompleted = appointment.services.every(s => s.status === "completed");
      const someInProgress = appointment.services.some(s => s.status === "in progress");
  
      if (allCompleted) {
        appointment.status = "completed";
      } else if (someInProgress) {
        appointment.status = "in progress";
      } else {
        appointment.status = "pending";
      }
  
      await appointment.save();
      return appointment;
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour du service: ${error.message}`);
    }
  }

}

module.exports = new AppointmentService();




  // Mettre à jour le statut d'un service dans un rendez-vous
  // async updateServiceStatus(appointmentId, serviceIndex, newStatus) {
  //   try {
  //     // Vérification des valeurs possibles du statut
  //     const validStatuses = ["pending", "in progress", "completed"];
  //     if (!validStatuses.includes(newStatus)) {
  //       throw new Error("Statut de service invalide.");
  //     }

  //     // Récupérer le rendez-vous
  //     const appointment = await Appointment.findById(appointmentId);
  //     if (!appointment) {
  //       throw new Error("Rendez-vous non trouvé.");
  //     }

  //     // Vérifier si l'index du service est valide
  //     if (serviceIndex < 0 || serviceIndex >= appointment.services.length) {
  //       throw new Error("Index de service invalide.");
  //     }

  //     // Mettre à jour le statut du service
  //     appointment.services[serviceIndex].status = newStatus;

  //     // Vérification du statut général du rendez-vous
  //     const allCompleted = appointment.services.every(service => service.status === "completed");
  //     const someInProgress = appointment.services.some(service => service.status === "in progress");

  //     if (allCompleted) {
  //       appointment.status = "completed";
  //       console.log("✅ Tous les services sont terminés, rendez-vous marqué comme 'completed'");
  //     } else if (someInProgress) {
  //       appointment.status = "in progress";
  //       console.log("🛠️ Certains services sont en cours, rendez-vous marqué comme 'in progress'");
  //     } else {
  //       appointment.status = "pending";
  //       console.log("⏳ Tous les services sont en attente, rendez-vous marqué comme 'pending'");
  //     }

  //     await appointment.save();
  //     return appointment;
  //   } catch (error) {
  //     throw new Error(`Error updating service status: ${error.message}`);
  //   }
  // }

