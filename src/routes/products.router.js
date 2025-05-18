import express from 'express'
import { deleteProductController, getProductByIdController, getProductsController, postProductController, updateProductController } from '../controllers/products.controller.js'
const router = express.Router()

router.get('/:id',getProductsController)
//router.get('/:id', (req, res, next) => {
//    console.log("ID recibido en la ruta:", req.params.id);
//    next();
//}, getProductsController);
router.get('/:id',getProductByIdController)
router.post('/',postProductController)
router.patch('/:id',updateProductController)
router.delete('/:id',deleteProductController)

export default router
