import express from 'express'
import { deleteTaxeController, getTaxesController, postTaxeController, updateTaxeController } from '../controllers/taxes.controller.js'
const router = express.Router()

router.get('/',getTaxesController)
router.post('/',postTaxeController)
router.patch('/:id',updateTaxeController)
router.delete('/:id',deleteTaxeController)

export default router