import mongoose from "mongoose";

export enum ErecurringTask{
    Daily = "Daily",
    Weekly = "Weekly",
    CustomInterval = "Custom interval"
}

const projectTaskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  defaultDueDate: {
    type: Boolean,
    default: true,
  },
  priorityLevel: {
    type: Boolean,
    default: true,
  },
  tagsLabels: {
    type: Boolean,
    default: true,
  },
  assigneeMode: {
    type: Boolean,
    default : true
  },
  recurringTask: {
    type: String,
    enum: [...Object.values(ErecurringTask)],
    default: ErecurringTask.Weekly,
  },
}, {
  timestamps: true,
  versionKey: false,
});

export const ProjectTaskModel = mongoose.model("projectTask", projectTaskSchema);
