// routes/user.router.js

import express from 'express';
const router = express.Router();
import { isLoggedIn } from '../middleware/verifyToken.middleware.js';
import {
  validateSignup,
  validateLogin,
  validateUpdateUser,
} from '../middleware/userValidation.middleware.js';
import UserController from '../controller/user.controller.js';

const userController = new UserController();

router.post('/signup', validateSignup, userController.signUp);
router.post('/login', validateLogin, userController.login);
router.get('/user', isLoggedIn, userController.getUser);
router.put('/user', isLoggedIn, validateUpdateUser, userController.updateUser);
router.delete('/user', isLoggedIn, userController.deleteUser);
router.post('/logout', isLoggedIn, userController.logout);

export default router;
