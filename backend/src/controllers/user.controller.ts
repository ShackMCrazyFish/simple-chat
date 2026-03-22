import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    constructor(private readonly userService: UserService) {}

    async getUser(req: Request, res: Response): Promise<void> {
        const userId = req.authUser?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const user = await this.userService.getUserById(userId);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.status(200).json(user);
    }
}