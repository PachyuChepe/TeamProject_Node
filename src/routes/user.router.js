// routes/user.router.js

import express from "express";
const router = express.Router();
import { isLoggedIn, isNotLoggedIn } from "../middleware/verifyToken.middleware.js";
import { validateSignup, validateLogin, validateUpdateUser } from "../middleware/userValidation.middleware.js";
import UserController from "../controller/user.controller.js";

const userController = new UserController();

router.post("/signup", isNotLoggedIn, validateSignup, userController.signUp);
router.post("/login", isNotLoggedIn, validateLogin, userController.login);
router.get("/user", isLoggedIn, userController.getUser);
router.put("/user", isLoggedIn, validateUpdateUser, userController.updateUser);
router.delete("/user", isLoggedIn, userController.deleteUser);
router.post("/logout", isLoggedIn, userController.logout);

export default router;

