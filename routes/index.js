import express from 'express';
import auth from './auth.js'
const route = express.Router();

// user routes link
route.use('/auth', auth);

export default route;