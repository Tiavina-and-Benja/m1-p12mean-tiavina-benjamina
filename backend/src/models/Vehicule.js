const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const VehiculeSchema = new mongoose.Schema(
  {
    marque: { type: String, required: true },
    modele: { type: String, required: true },
    annee: { type: Number, required: true },
    immatriculation: { type: String, required: true, unique: true },
    type_carburant: { type: String, required: true, enum: ["essence", "diesel", "électrique", "hybride"] },
    id_proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);
VehiculeSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});
VehiculeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Vehicule", VehiculeSchema);