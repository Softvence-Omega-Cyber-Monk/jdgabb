import { NextFunction, Request, Response } from "express";
export declare const stripeWebhook: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const PaymentController: {
    createPaymentSession: (req: Request, res: Response, next: NextFunction) => void;
    stripeWebhook: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=payment.controller.d.ts.map