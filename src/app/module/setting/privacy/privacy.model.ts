import mongoose from "mongoose";

const privacySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  autoDelete: {
    type: String,
    enum: ["none", "7d", "30d", "90d"],
    default: "30d",
  },
  deletionMethod: {
    type: String,
    enum: ["archive", "permanent"],
    default: "archive",
  },
  excludeFromAI: {
    type: Boolean,
    default: true,
  },
  localStorage: {
    type: Boolean,
    default: false,
  },
  cloudSync: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

export const PrivacyModel = mongoose.model("privacy", privacySchema);
