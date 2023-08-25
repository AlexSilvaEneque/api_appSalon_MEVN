import express from 'express'
import { register, verifyAccount, login, user, admin, forgotPassword, verifyPasswordResetToken, updatePassword } from '../controllers/authController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

// Rutas de autenticacion y registro de usuarios
router.post('/register', register)
router.get('/verify/:token', verifyAccount)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.route('/forgot-password/:token')
    .get(verifyPasswordResetToken)
    .post(updatePassword)

// Area privada - Requiere un JWT
router.get('/user', authMiddleware, user)
router.get('/admin', authMiddleware, admin)


export default router