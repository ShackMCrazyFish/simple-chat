import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import jwt from 'jsonwebtoken';

export class UserController {
    constructor(private readonly userService: UserService) {}

    async getUser(req: Request, res: Response): Promise<void> {
        const authToken = req.headers.authorization?.split(' ')[1];

        if (!authToken) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const decoded = jwt.verify(authToken, process.env.JWT_SECRET as string);
if (!decoded.payload?.user.id) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
}
        const user = await this.userService.getUserById(decoded.payload.user.id);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.status(200).json(user);
    }
}