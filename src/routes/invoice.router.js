import express from 'express'
import { getInvoicesController, postInvoiceController, getInvoiceForAdmin, getVentasDelDia } from '../controllers/invoice.controller.js'
const router = express.Router()

router.get('/',getInvoicesController)
router.post('/',postInvoiceController)
router.get('/:adminId',getInvoiceForAdmin)
router.get("/hoy", getVentasDelDia);

export default router
