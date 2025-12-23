import express from 'express';
import { register } from '../controllers/authController.js';
import { login } from '../controllers/authController.js';
import { create_club, show_clubs } from '../controllers/clubController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/create_club', create_club);
router.get('/clubs', show_clubs);

export default router;