const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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

UserSchema.index({ first_name: 'text', last_name: 'text', email: 'text', phone: 'text' });
UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", UserSchema);