const VehiculeService = require("../services/vehiculeService");

exports.getVehicules = async (req, res, next) => {
  try {
    const vehicules = await VehiculeService.getAllVehicules();
    res.status(200).json(vehicules);
  } catch (error) {
    next(error);
  }
};

exports.getVehiculeById = async (req, res, next) => {
  try {
    const vehicule = await VehiculeService.getVehiculeById(req.params.id);
    if (!vehicule) return res.status(404).json({ message: "Véhicule non trouvé" });
    res.status(200).json(vehicule);
  } catch (error) {
    next(error);
  }
};

exports.addVehicule = async (req, res, next) => {
  try {
    const vehicule = await VehiculeService.createVehicule(req.body);
    res.status(201).json(vehicule);
  } catch (error) {
    next(error);
  }
};

exports.updateVehicule = async (req, res, next) => {
  try {
    const vehicule = await VehiculeService.updateVehicule(req.params.id, req.body);
    if (!vehicule) return res.status(404).json({ message: "Véhicule non trouvé" });
    res.status(200).json(vehicule);
  } catch (error) {
    next(error);
  }
};

exports.deleteVehicule = async (req, res, next) => {
  try {
    const vehicule = await VehiculeService.deleteVehicule(req.params.id);
    if (!vehicule) return res.status(404).json({ message: "Véhicule non trouvé" });
    res.status(200).json({ message: "Véhicule supprimé avec succès" });
  } catch (error) {
    next(error);
  }
};