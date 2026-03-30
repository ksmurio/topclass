import express from 'express';
import multer from 'multer';
import { register, login, getUser } from '../controllers/authController.js';
import {show_clubs, create_club, load_club, joinClub, deleteMember, deleteClub, get_subjects, leaveClub} from '../controllers/clubController.js';
import { getSubjects } from '../controllers/subjectController.js';
import { addGrade,getUserGradesChart  } from '../controllers/subject_gradesController.js';
import { verifyToken } from '../middleware/authmiddleware.js';
import { createBattle,getUserBattles  } from '../controllers/battleController.js';

const storage = multer.diskStorage({ //vermelho
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
router.get('/user', verifyToken, getUser);
router.post('/create_club',verifyToken, upload.single('image') ,create_club);
router.get('/clubs',verifyToken, show_clubs);
router.post('/club/:id/battle', verifyToken, createBattle);
router.get('/club/:id',verifyToken, load_club);
router.post('/club/:id',verifyToken, joinClub);
router.delete('/club/:id',verifyToken, deleteClub);
router.delete('/club/:id/member/:memberId',verifyToken, deleteMember);
router.get('/getSubjects',verifyToken, getSubjects);
router.post('/addGrade',verifyToken, addGrade);
router.get('/battles', verifyToken, getUserBattles);
router.get('/grades/chart', verifyToken, getUserGradesChart);
router.get('/subjects', get_subjects);
router.delete('/club/:id/leave', leaveClub);

export default router;