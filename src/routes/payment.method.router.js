import express from 'express'
import { getPaymentMethodsController } from '../controllers/payment.method.controller.js'
const router = express.Router()

router.get('/',getPaymentMethodsController)
export default router