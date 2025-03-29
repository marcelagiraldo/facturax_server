import express from 'express'
import { getInvoicesController, postInvoiceController } from '../controllers/invoice.controller.js'
const router = express.Router()

router.get('/',getInvoicesController)
router.post('/',postInvoiceController)

export default router