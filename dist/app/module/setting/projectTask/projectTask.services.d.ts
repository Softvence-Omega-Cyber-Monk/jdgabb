import { ProjectTaskModel } from "./projectTask.model";
export declare const projectTaskServices: {
    findProjectTaskByUserId: (id: String) => Promise<(import("mongoose").Document<unknown, {}, {
        userId: import("mongoose").Types.ObjectId;
        defaultDueDate: boolean;
        priorityLevel: boolean;
        tagsLabels: boolean;
        assigneeMode: boolean;
        recurringTask: import("./projectTask.model").ErecurringTask;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: import("mongoose").Types.ObjectId;
        defaultDueDate: boolean;
        priorityLevel: boolean;
        tagsLabels: boolean;
        assigneeMode: boolean;
        recurringTask: import("./projectTask.model").ErecurringTask;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    updateProjectTaskByUserID: (id: string, updatedData: Partial<typeof ProjectTaskModel>) => Promise<(import("mongoose").Document<unknown, {}, {
        userId: import("mongoose").Types.ObjectId;
        defaultDueDate: boolean;
        priorityLevel: boolean;
        tagsLabels: boolean;
        assigneeMode: boolean;
        recurringTask: import("./projectTask.model").ErecurringTask;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: import("mongoose").Types.ObjectId;
        defaultDueDate: boolean;
        priorityLevel: boolean;
        tagsLabels: boolean;
        assigneeMode: boolean;
        recurringTask: import("./projectTask.model").ErecurringTask;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
};
//# sourceMappingURL=projectTask.services.d.ts.map