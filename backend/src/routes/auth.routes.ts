import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { UserModel } from "../models/user.model";
import { AuthService } from "../services/auth.service";

const router = Router();

const authService = new AuthService(UserModel);
const authController = new AuthController(authService);

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post('/refresh', authController.refreshToken.bind(authController));

export default router;