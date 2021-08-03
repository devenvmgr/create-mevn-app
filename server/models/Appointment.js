const mongoose = require("mongoose");

const { Schema } = mongoose;

const appointmentSchema = Schema({
  available: {
    type: Boolean,
  },
  customerID: {
    type: Schema.ObjectId,
  },
  barberID: {
    type: Schema.ObjectId,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  start: {
    type: String,
    required: true,
    trim: true,
  },
  end: {
    type: String,
    required: true,
    trim: true,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
