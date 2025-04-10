const Appointment = require("../models/Appointment");

class AppointmentService {
  // Créer un rendez-vous
  async createAppointment(data) {
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

  async addMechanicsToAppointment(appointmentId, mechanicIds) {
    try {
      if (!Array.isArray(mechanicIds)) {
        mechanicIds = [mechanicIds]; // Convertir en tableau si ce n'est pas déjà le cas
      }

      return await Appointment.findByIdAndUpdate(
        appointmentId,
        { $addToSet: { mechanicIds: { $each: mechanicIds } } }, // Ajoute plusieurs valeurs sans doublons
        { new: true }
      ).populate("clientId vehicleId mechanicIds");
    } catch (error) {
      throw new Error(`Error adding mechanics: ${error.message}`);
    }
  }

  // Récupérer un rendez-vous par ID
  async getAppointmentById(id) {
    try {
      return await Appointment.findById(id)
        .populate("clientId vehicleId mechanicIds")
        .populate("messages.senderId");
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

  async getAllAppointments() {
    try {
      const appointments = await Appointment.find().populate(
        "clientId vehicleId"
      );
      return appointments;
    } catch (error) {
      console.error("Erreur lors de la récupération des rendez-vous:", error);
      throw new Error("Impossible de récupérer les rendez-vous.");
    }
  }

  // Récupérer tous les rendez-vous d'un client
  async getPaginatedAppointmentsByClient(
    criteria,
    { page, limit, sort, search }
  ) {
    try {
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;

      const dynamicSort =
        sort && sort.field !== ""
          ? { [sort.field]: sort.order === "desc" ? -1 : 1 }
          : { createdAt: -1 };

      if (search) {
        const searchTerms = search
          .split(" ")
          .filter((term) => term.trim() !== "");

        criteria = {
          ...criteria,
          $and: searchTerms.map((term) => ({
            $or: [
              { name: { $regex: term, $options: "i" } },
              { description: { $regex: term, $options: "i" } },
            ],
          })),
        };
      }
      const services = await Appointment.paginate(criteria, {
        page,
        limit,
        sort: dynamicSort,
        populate: [
          { path: "vehicleId", select: "marque modele immatriculation annee" },
          { path: "clientId", select: "first_name last_name email phone" },
        ],
      });
      return services;
    } catch (error) {
      throw new Error(
        `Erreur lors de la recherche de services: ${error.message}`
      );
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

  // Récupérer les rendez-vous paginés d'un mécanicien
  async getPaginatedAppointmentsByMechanic(
    mechanicId,
    { page, limit, sort, search }
  ) {
    try {
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;

      const dynamicSort =
        sort && sort.field !== ""
          ? { [sort.field]: sort.order === "desc" ? -1 : 1 }
          : { createdAt: -1 };

      let criteria = { mechanicIds: { $in: [mechanicId] } };
      if (search) {
        const searchTerms = search
          .split(" ")
          .filter((term) => term.trim() !== "");

        criteria = {
          ...criteria,
          $and: searchTerms.map((term) => ({
            $or: [
              { "vehicleId.marque": { $regex: term, $options: "i" } },
              { "vehicleId.modele": { $regex: term, $options: "i" } },
              { "clientId.first_name": { $regex: term, $options: "i" } },
              { "clientId.last_name": { $regex: term, $options: "i" } },
            ],
          })),
        };
      }

      const appointments = await Appointment.paginate(criteria, {
        page,
        limit,
        sort: dynamicSort,
        populate: [
          {
            path: "vehicleId",
            select: "marque modele immatriculation annee type_carburant",
          },
          { path: "clientId", select: "first_name last_name email phone" },
        ],
      });

      return appointments;
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération des rendez-vous du mécanicien: ${error.message}`
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
      const service = appointment.services.find(
        (s) => s._id.toString() === serviceId
      );
      if (!service) {
        throw new Error("Service non trouvé dans le rendez-vous.");
      }

      // Mettre à jour le statut du service
      service.status = newStatus;

      // Vérifier si tous les services sont terminés
      const allCompleted = appointment.services.every(
        (s) => s.status === "completed"
      );
      const someInProgress = appointment.services.some(
        (s) => s.status === "in progress"
      );

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
      throw new Error(
        `Erreur lors de la mise à jour du service: ${error.message}`
      );
    }
  }

  async getEstimate(appointmentId) {
    try {
      const appointment = await Appointment.findById(appointmentId).populate(
        "services"
      );
      if (!appointment) {
        throw new Error("Rendez-vous non trouvé.");
      }

      const servicesDetails = appointment.services.map((service) => ({
        name: service.name,
        price: service.price,
        description: service.description,
      }));

      const totalPrice = servicesDetails.reduce(
        (sum, service) => sum + service.price,
        0
      );

      return {
        appointmentId,
        services: servicesDetails,
        totalPrice,
      };
    } catch (error) {
      throw new Error(
        `Erreur lors de la génération du devis: ${error.message}`
      );
    }
  }

  async addPartToService(appointmentId, serviceId, parts) {
    try {
      const appointment = await Appointment.findById(appointmentId);
      if (!appointment) {
        throw new Error("Rendez-vous non trouvé.");
      }

      const service = appointment.services.find(
        (s) => s._id.toString() === serviceId
      );
      if (!service) {
        throw new Error("Service non trouvé dans le rendez-vous.");
      }

      // Ajouter la pièce à la liste des pièces du service
      service.parts = parts;

      await appointment.save();
      return appointment;
    } catch (error) {
      throw new Error(`Erreur lors de l'ajout de la pièce: ${error.message}`);
    }
  }

  async addMessageToAppointment(appointmentId, senderId, text) {
    try {
      // console.log("appointmentId reçu:", appointmentId);
      // Trouver le rendez-vous par ID
      const appointment = await Appointment.findById(appointmentId);
      if (!appointment) {
        throw new Error("Appointment not found");
      }

      // Ajouter un message au tableau des messages
      appointment.messages.push({
        senderId,
        text,
      });

      // Sauvegarder l'appointment mis à jour
      await appointment.save();
      return appointment;
    } catch (error) {
      throw new Error(`Error adding message: ${error.message}`);
    }
  }
}

module.exports = new AppointmentService();
