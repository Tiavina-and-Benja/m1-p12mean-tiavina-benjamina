const Service = require("../models/Service");
const authService = require("../services/authService");
const ServiceService = require("../services/serviceService");

exports.createService = async (req, res, next) => {
  const { name, price, description } = req.body;
  try {
    const service = await ServiceService.createService({
      name,
      price,
      description,
    });
    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
};

exports.getPaginatedService = async (req, res, next) => {
  const { page, limit, sortField, sortOrder, search } = req.query;
  try {
    const services = await ServiceService.findPaginatedService(
      {},
      { page, limit, sort: { field: sortField, order: sortOrder }, search }
    );
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

exports.updateService = async (req, res, next) => {
  const serviceId = req.params.serviceId;
  const { name, price, description } = req.body;
  try {
    const service = await ServiceService.updateService(serviceId, {
      name,
      price,
      description,
    });
    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};

exports.deleteService = async (req, res, next) => {
  const serviceId = req.params.serviceId;
  try {
    const service = await ServiceService.deleteService(serviceId);
    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};
