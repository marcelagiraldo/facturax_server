import express from 'express'
import { deleteProductController, getProductByIdController, getProductsController, postProductController, updateProductController } from '../controllers/products.controller.js'
const router = express.Router()

router.get('/',getProductsController)
router.get('/:id',getProductByIdController)
router.post('/',postProductController)
router.patch('/:id',updateProductController)
router.delete('/:id',deleteProductController)

export default router