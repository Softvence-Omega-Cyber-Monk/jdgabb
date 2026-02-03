import { NextFunction, Request, Response } from "express";
export declare const revenueCatWebhook: (req: Request, res: Response) => Promise<void>;
export declare const PaymentController: {
    createPaymentSession: (req: Request, res: Response, next: NextFunction) => void;
    getAllPayment: (req: Request, res: Response, next: NextFunction) => void;
};
//# sourceMappingURL=payment.controller.d.ts.map