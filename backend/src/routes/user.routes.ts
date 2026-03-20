import { Router } from 'express';
import { UserModel } from 'src/models/user.model';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
const router = Router();

const userService = new UserService(UserModel);
const userController = new UserController(userService);

router.get('/me', (req, res) => {
    userController.getUser(req, res);
});

export default router;