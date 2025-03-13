const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: "pending" },
});

module.exports = mongoose.model("Manager", taskSchema);
