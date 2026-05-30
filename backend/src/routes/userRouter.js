import express from 'express'
import userController from '../controller/userController.js'

const router = express.Router()

router.get('/checkUsername', userController.checkUsername)

export default router;