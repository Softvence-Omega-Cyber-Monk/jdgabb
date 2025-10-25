import { Types } from "mongoose";
export declare const paymentService: {
    checkout: (data: {
        userId: Types.ObjectId;
        email: string;
        amount: number;
    }) => Promise<{
        success: boolean;
        url: string | null;
        message?: never;
        error?: never;
    } | {
        success: boolean;
        message: string;
        error: any;
        url?: never;
    }>;
};
//# sourceMappingURL=payment.services.d.ts.map