import express from 'express';
import { register } from '../controllers/authController.js';
import { login } from '../controllers/authController.js';
import {show_clubs, create_club, load_club, joinClub, deleteMember, deleteClub } from '../controllers/clubController.js';
import { saveNotes } from '../controllers/notesController.js'
import { upload } from '../middleware/upload.js';
import { verifyToken } from '../middleware/authmiddleware.js'

const router = express.Router();

router.post('/register', upload.single('profile_picture'), register);
router.post('/login', login);
router.post('/create_club', verifyToken, create_club);
router.get('/clubs', verifyToken, show_clubs);
router.get('/club/:id', verifyToken, load_club);
router.post('/club/:id', verifyToken, joinClub);
router.delete('/club/:id', verifyToken, deleteClub);
router.delete('/club/:id/member/:memberId', verifyToken, deleteMember);
router.post('/saveNotes', verifyToken, saveNotes);



export default router;