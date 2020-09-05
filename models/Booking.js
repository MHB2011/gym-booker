const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", //refer to collection in database
  },
  training: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "trainings",
  },
  name: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("booking", BookingSchema);
