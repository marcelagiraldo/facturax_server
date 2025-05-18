import express from 'express'
import { getInvoicesController, postInvoiceController, getInvoiceForAdmin } from '../controllers/invoice.controller.js'
const router = express.Router()

router.get('/',getInvoicesController)
router.post('/',postInvoiceController)
router.get('/:adminId',getInvoiceForAdmin)

export default router
