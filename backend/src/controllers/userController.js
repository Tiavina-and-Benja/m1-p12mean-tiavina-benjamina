const User = require("../models/User");
const UserService = require("../services/userService");
const { hashPassword } = require("../utils/hash");

exports.getUsers = async (req, res, next) => {
  const { page, limit, profil, sortField, sortOrder, search } = req.query;
  try {
    const users = await UserService.findUsersPaginated(
      { profil: profil },
      {
        page,
        limit,
        sort: {
          field: sortField,
          order: sortOrder,
        },
        search
      }
    );
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.addUser = async (req, res, next) => {
  const { first_name, last_name, email, phone, password, profil } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user = new User({
      first_name,
      last_name,
      email,
      phone,
      password: hashedPassword,
      profil,
    });
    await UserService.createUser(user);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
