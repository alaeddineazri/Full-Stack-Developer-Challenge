const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 20,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    adminList: {
        type: Array,
        default: [],
      },
    usersList: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      enum: ["green", "yellow", "red"],
      default: "green",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
