import express from 'express';
import multer from 'multer';
import { userLogin, userRegistration } from '../controller/auth.js';

const route = express.Router();

// multer, Setting multer location for file save
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/profile');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage});

// user registration
route.post('/register', upload.single('file'), userRegistration);

// user login
route.post('/login', userLogin);

export default route;