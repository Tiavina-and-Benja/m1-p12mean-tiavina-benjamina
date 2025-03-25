const mongoose = require("mongoose");
const Service = require("./Service");

const appointmentSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // vehicleId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Vehicle",
    //   required: true,
    // },
    mechanicIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        validate: {
          validator: function (mechanicIds) {
            return new Set(mechanicIds.map(String)).size === mechanicIds.length;
          },
          message: "Duplicate mechanic IDs are not allowed.",
        },
      },
    ],
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in progress", "completed", "canceled"],
      default: "pending",
    },
    services: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, default: "" },
      },
    ],
    remarks: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
