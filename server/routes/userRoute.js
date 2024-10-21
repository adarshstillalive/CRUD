import express from 'express';
import userController from '../controllers/userController.js';
import jwtVerify from '../middleware/jwtVerify.js';


const userRoute = express.Router();

userRoute.get('/', jwtVerify, userController.getHome)
userRoute.post('/login', userController.postLogin)
userRoute.post('/signup', userController.postSignup)

export default userRoute