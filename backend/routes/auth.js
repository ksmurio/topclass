import express from 'express';
import multer from 'multer';
import { register, login } from '../controllers/authController.js';
import {show_clubs, create_club, load_club, joinClub, deleteMember, deleteClub} from '../controllers/clubController.js';
import { getSubjects } from '../controllers/subjectController.js';
import { addGrade } from '../controllers/subject_gradesController.js';
import { verifyToken } from '../middleware/authmiddleware.js';

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

router.post('/register', upload.single('profile_picture'), register);
router.post('/login', login);
router.post('/create_club',verifyToken, upload.single('image') ,create_club);
router.get('/clubs',verifyToken, show_clubs);
router.get('/club/:id',verifyToken, load_club);
router.post('/club/:id',verifyToken, joinClub);
router.delete('/club/:id',verifyToken, deleteClub);
router.delete('/club/:id/member/:memberId',verifyToken, deleteMember);
router.get('/getSubjects',verifyToken, getSubjects);
router.post('/addGrade',verifyToken, addGrade);



export default router;