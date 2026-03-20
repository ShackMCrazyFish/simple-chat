import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { UserModel } from "../models/user.model";
import { AuthService } from "../services/auth.service";

const router = Router();

const authService = new AuthService(UserModel);
const authController = new AuthController(authService);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);

export default router;