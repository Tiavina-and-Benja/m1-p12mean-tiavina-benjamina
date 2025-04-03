const Service = require("../models/Service");

class ServiceService {
  async createService(data) {
    return await Service.create(data);
  }

  async findServicesByIds(serviceIds) {
    try {
      const services = await Service.find({ _id: { $in: serviceIds } });
      return services;
    } catch (error) {
      console.error("Error fetching services:", error);
      throw new Error("Could not fetch services");
    }
  }

  async findPaginatedService(criteria, { page, limit, sort, search }) {
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
      const services = await Service.paginate(criteria, {
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

  async getAllServices() {
    return await Service.find();
  }

  async getServiceById(id) {
    return await Service.findById(id);
  }

  async updateService(id, data) {
    return await Service.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteService(id) {
    return await Service.findByIdAndDelete(id);
  }
}

module.exports = new ServiceService();
