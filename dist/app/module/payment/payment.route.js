"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const protect_1 = require("../../middleware/protect");
const user_interface_1 = require("../user/user.interface");
const PaymentRoute = (0, express_1.Router)();
PaymentRoute.post('/checkout', (0, protect_1.protectUser)(user_interface_1.Role.USER), payment_controller_1.PaymentController.createPaymentSession);
exports.default = PaymentRoute;
//# sourceMappingURL=payment.route.js.map