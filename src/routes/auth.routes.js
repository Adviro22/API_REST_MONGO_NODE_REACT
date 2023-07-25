import express from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';

const router = express.Router();

// Rutas para registrarse e iniciar sesión
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
export default router;