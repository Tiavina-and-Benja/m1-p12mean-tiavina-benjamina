const bcrypt = require('bcryptjs');

exports.hashPassword = async (password) => {
    console.log("password", password);
    return await bcrypt.hash(password, 10);
}