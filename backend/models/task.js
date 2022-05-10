const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
      type: String,
      enum: ["New", "Active", "Done"],
      default: "New",
    },
    project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
