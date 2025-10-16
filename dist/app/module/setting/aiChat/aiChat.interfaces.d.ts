import { Types } from "mongoose";
import { EContextMemory } from "./aiChat.model";
export interface IAiChat extends Document {
    userId: Types.ObjectId;
    contextMemory: EContextMemory;
    ProactiveSuggestion: boolean;
    AutoCompleteFromChat: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=aiChat.interfaces.d.ts.map