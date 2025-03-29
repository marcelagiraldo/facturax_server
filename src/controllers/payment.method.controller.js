import { getPaymentMethods } from "../services/payment.method.service.js";

export const getPaymentMethodsController = async (req, res, next) => {
    try {
        const paymentMethods = await getPaymentMethods();
        res.json(paymentMethods);
    } catch (error) {
        next(error);
    }
};