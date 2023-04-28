const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    images: [String],
  },
  { timetsamps: true }
);
module.exports = mongoose.model("Album", albumSchema);
