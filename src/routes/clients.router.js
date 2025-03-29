import express from 'express'
import {deleteClientController, getClientByIdController, getClientsController, postClientController, updateClientController} from '../controllers/clients.controller.js'

const router = express.Router()

router.get('/',getClientsController)
router.get('/:id',getClientByIdController)
router.post('/',postClientController)
router.patch('/:id',updateClientController)
router.delete('/:id',deleteClientController)

export default router