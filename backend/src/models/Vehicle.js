const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  licensePlate: { type: String, required: true, unique: true },
  year: { type: Number, required: true },
  maintenanceHistory: [
    {
      date: { type: Date, default: Date.now },
      type: String,
      mechanicId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      remarks: String,
    },
  ],
});
