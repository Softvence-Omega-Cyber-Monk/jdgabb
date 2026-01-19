import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    goal: {
      type: String,
      required: true,
      trim: true
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      }
    ],
    visibility: {
      type: String,
      enum: ["private", "restricted"],
      default: "private",
    },
    sharedWith: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        role: {
          type: String,
          enum: ["viewer"],
          default: "viewer",
        }
      }
    ]
  },
  { timestamps: true, versionKey: false }
);

export const UpdateProject = mongoose.model("UpdateProject", projectSchema);
