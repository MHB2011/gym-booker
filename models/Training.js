const mongoose = require("mongoose");

const TrainingSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  category: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  max_people: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("training", TrainingSchema);
