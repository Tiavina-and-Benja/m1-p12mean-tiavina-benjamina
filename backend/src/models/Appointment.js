const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const appointmentSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicule",
      required: true,
    },
    mechanicIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // validate: {
        //   validator: function (mechanicIds) {
        //     return new Set(mechanicIds.map(String)).size === mechanicIds.length;
        //   },
        //   message: "Duplicate mechanic IDs are not allowed.",
        // },
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
        _id: { type: mongoose.Schema.Types.ObjectId, ref : "Service", required: true, },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, default: "" },
        status: {
          type: String,
          enum: ["pending", "in progress", "completed"],
          default: "pending",
        },
        parts: [
          {
            name: { type: String, required: true },
            quantity: { type: Number, required: true, min: 1 },
            serialNumber: { type: String, default: "" },
          },
        ],
      },
    ],
    remarks: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
appointmentSchema.set("toObject", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

appointmentSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

appointmentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Appointment", appointmentSchema);