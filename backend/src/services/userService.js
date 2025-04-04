// services/user.service.js
const User = require("../models/User");
const ERROR = require("../errors/errors");

class UserService {
  /**
   * Récupère tous les utilisateurs
   * @returns {Promise<Array>} Liste des utilisateurs
   */
  async getAllUsers() {
    try {
      return await User.find();
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération des utilisateurs: ${error.message}`
      );
    }
  }

  /**
   * Récupère un utilisateur par son ID
   * @param {string} id - ID de l'utilisateur
   * @returns {Promise<Object>} Utilisateur trouvé
   */
  async getUserById(id) {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error("Utilisateur non trouvé");
      }
      return user;
    } catch (error) {
      throw new Error(
        `Erreur lors de la recherche de l'utilisateur: ${error.message}`
      );
    }
  }

  /**
   * Crée un nouvel utilisateur
   * @param {User} userData - Données de l'utilisateur
   * @returns {Promise<Object>} Utilisateur créé
   */
  async createUser(userData) {
    try {
      // Vérifier si l'email existe déjà
      const existingUser = await User.findOne({
        email: userData.email,
        profil: userData.profil,
      });
      if (existingUser) {
        throw ERROR.RESOURCE_ALREADY_EXISTS();
      }

      const newUser = new User(userData);
      return await newUser.save();
    } catch (error) {
      throw new Error(
        `Erreur lors de la création de l'utilisateur: ${error.message}`
      );
    }
  }

  /**
   * Met à jour un utilisateur existant
   * @param {string} id - ID de l'utilisateur
   * @param {Object} updateData - Données à mettre à jour
   * @returns {Promise<Object>} Utilisateur mis à jour
   */
  async updateUser(id, updateData) {
    try {
      // Ajouter la date de mise à jour
      updateData.updated_at = Date.now();

      const user = await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        throw new Error("Utilisateur non trouvé");
      }

      return user;
    } catch (error) {
      throw new Error(
        `Erreur lors de la mise à jour de l'utilisateur: ${error.message}`
      );
    }
  }

  /**
   * Supprime un utilisateur
   * @param {string} id - ID de l'utilisateur
   * @returns {Promise<boolean>} Succès de la suppression
   */
  async deleteUser(id) {
    try {
      const result = await User.findByIdAndDelete(id);

      if (!result) {
        throw new Error("Utilisateur non trouvé");
      }

      return true;
    } catch (error) {
      throw new Error(
        `Erreur lors de la suppression de l'utilisateur: ${error.message}`
      );
    }
  }

  /**
   * Recherche des utilisateurs selon certains critères
   * @param {Object} criteria - Critères de recherche
   * @returns {Promise<Array>} Liste des utilisateurs correspondants
   */
  async findUsers(criteria) {
    try {
      return await User.find(criteria);
    } catch (error) {
      throw new Error(
        `Erreur lors de la recherche d'utilisateurs: ${error.message}`
      );
    }
  }

  async findUsersPaginated(criteria, { page, limit, sort, search }) {
    try {
      page = parseInt(page);
      limit = parseInt(limit);

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
              { first_name: { $regex: term, $options: "i" } },
              { last_name: { $regex: term, $options: "i" } },
              { phone: { $regex: term, $options: "i" } },
              { email: { $regex: term, $options: "i" } },
            ],
          })),
        };
      }

      const users = await User.paginate(criteria, {
        page,
        limit,
        select: "-password",
        sort: dynamicSort,
      });
      return users;
    } catch (error) {
      throw new Error(
        `Erreur lors de la recherche d'utilisateurs: ${error.message}`
      );
    }
  }

  async findOneUser(criteria) {
    try {
      return await User.findOne(criteria);
    } catch (error) {
      throw new Error(
        `Erreur lors de la recherche d'utilisateurs: ${error.message}`
      );
    }
  }
}

module.exports = new UserService();
