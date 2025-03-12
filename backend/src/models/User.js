const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    password: { type: String, required: false },
    profil: {type: String, required: true, enum: ['user', 'mecanicien', 'manager'], default: 'user'},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
