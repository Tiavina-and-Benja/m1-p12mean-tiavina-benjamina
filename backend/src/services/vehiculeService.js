const Vehicule = require("../models/Vehicule");

class VehiculeService {
  async getAllVehicules() {
    return await Vehicule.find().populate(
      "id_proprietaire",
      "first_name last_name email"
    );
  }

  async getVehiculeById(id) {
    return await Vehicule.findOne({ id }).populate(
      "id_proprietaire",
      "first_name last_name email"
    );
  }

  async createVehicule(data) {
    const vehicule = new Vehicule(data);
    return await vehicule.save();
  }

  async updateVehicule(id, data) {
    return await Vehicule.findOneAndUpdate({ id }, data, {
      new: true,
      runValidators: true,
    });
  }

  async getAllVehiculesByClient(clientId) {
    try {
      return await Vehicule.find({ id_proprietaire: clientId });
    } catch (error) {
      throw new Error(`Error fetching client's appointments: ${error.message}`);
    }
  }

  async findPaginatedVehicule(criteria, { page, limit, sort, search }) {
    try {
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;

      const dynamicSort =
        sort && sort.field !== ""
          ? { [sort.field]: sort.order === "desc" ? -1 : 1 }
          : { createdAt: -1 };

      const services = await Vehicule.paginate(criteria, {
        page,
        limit,
        sort: dynamicSort,
      });
      return services;
    } catch (error) {
      throw new Error(
        `Erreur lors de la recherche de services: ${error.message}`
      );
    }
  }

  // async deleteVehicule(id) {
  //   return await Vehicule.findOneAndDelete({ id });
  // }
}

module.exports = new VehiculeService();
