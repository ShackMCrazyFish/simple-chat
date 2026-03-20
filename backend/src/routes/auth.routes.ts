import { Router } from "express";
import { AuthController } from "src/controllers/auth.controller";
import { UserModel } from "src/models/user.model";
import { AuthService } from "src/services/auth.service";

const router = Router();

const authService = new AuthService(UserModel);
const authController = new AuthController(authService);

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;