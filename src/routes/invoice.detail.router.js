import express from 'express'
import { getInvoicesDetailsController, postInvoiceDetailController } from '../controllers/invoice.details.controller.js'
const router = express.Router()

router.get('/',getInvoicesDetailsController)
router.post('/',postInvoiceDetailController)

export default router