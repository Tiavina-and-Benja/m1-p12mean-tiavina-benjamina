const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const VehiculeSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    marque: { type: String, required: true },
    modele: { type: String, required: true },
    annee: { type: Number, required: true },
    immatriculation: { type: String, required: true, unique: true },
    type_carburant: { type: String, required: true, enum: ["essence", "diesel", "électrique", "hybride"] },
    id_proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

// VehiculeSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("Vehicule", VehiculeSchema);