import express from 'express'
import { borrarNotaController, crearNotaController, listarNotasController } from '../controllers/notes.controller'
const router = express.Router()

router.get('/',listarNotasController)
router.post('/',crearNotaController)
router.get('/:id',borrarNotaController)

export default router
