const Vehicule = require("../models/Vehicule");

class VehiculeService {
  async getAllVehicules() {
    return await Vehicule.find().populate("id_proprietaire", "first_name last_name email");
  }

  async getVehiculeById(id) {
    return await Vehicule.findOne({ id }).populate("id_proprietaire", "first_name last_name email");
  }

  async createVehicule(data) {
    const vehicule = new Vehicule(data);
    return await vehicule.save();
  }

  async updateVehicule(id, data) {
    return await Vehicule.findOneAndUpdate({ id }, data, { new: true, runValidators: true });
  }

  // async deleteVehicule(id) {
  //   return await Vehicule.findOneAndDelete({ id });
  // }
}

module.exports = new VehiculeService();