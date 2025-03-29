import express from 'express'
import { getUserByIdController, loginUser, postUserController, updateUserController } from '../controllers/user.controller.js'
const router = express.Router()

router.get('/:id',getUserByIdController)
router.post('/register',postUserController)
router.post('/login',loginUser)
router.patch('/:id',updateUserController)

export default router