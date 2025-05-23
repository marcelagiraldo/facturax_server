import express from 'express'
import { borrarNotaController, crearNotaController, listarNotasController } from '../controllers/notes.controller.js'
const router = express.Router()

router.get('/',listarNotasController)
router.post('/',crearNotaController)
router.delete('/:id',borrarNotaController)

export default router
