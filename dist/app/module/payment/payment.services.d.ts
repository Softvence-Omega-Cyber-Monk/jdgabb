import { Types } from "mongoose";
export declare const paymentService: {
    checkout: (data: {
        userId: Types.ObjectId;
        email: string;
        amount: number;
        paymentType: string;
    }) => Promise<{
        success: boolean;
        url: string | null;
        sessionId: string;
    }>;
};
//# sourceMappingURL=payment.services.d.ts.map