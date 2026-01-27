import express from 'express';
import { register } from '../controllers/authController.js';
import { login } from '../controllers/authController.js';
import {show_clubs, create_club, load_club, joinClub, deleteMember, deleteClub } from '../controllers/clubController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/create_club', create_club);
router.get('/clubs', show_clubs);
router.get('/club/:id', load_club);
router.post('/club/:id', joinClub);
router.delete('/club/:id', deleteClub);
router.delete('/club/:id/member/:memberId', deleteMember);



export default router;