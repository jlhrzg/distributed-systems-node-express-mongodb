const mongoose = require("mongoose");

// Mongodb schema for Notebook with timestamps
const notebookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String
  }
},   { timestamps: true }
);

module.exports = mongoose.model("Notebook", notebookSchema);
