import express from 'express';
import multer from 'multer';
import { register, login } from '../controllers/authController.js';
import {show_clubs, create_club, load_club, joinClub, deleteMember, deleteClub} from '../controllers/clubController.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/create_club', upload.single('image') ,create_club);
router.get('/clubs', show_clubs);
router.get('/club/:id', load_club);
router.post('/club/:id', joinClub);
router.delete('/club/:id', deleteClub);
router.delete('/club/:id/member/:memberId', deleteMember);



export default router;