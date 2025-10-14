import { Types } from "mongoose";

export interface INotification {
  userId: Types.ObjectId | string;
  push: boolean;
  inAppReminder: boolean;
  smart: boolean;
  snoozeOptions: number[];
  createdAt?: Date;
  updatedAt?: Date;
}