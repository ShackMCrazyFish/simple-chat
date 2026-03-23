import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthTokenPayload } from '../types/auth-token-payload';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        if (typeof decoded === 'string') {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const payload = decoded as AuthTokenPayload;
        if (!payload.user?.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.authUser = payload.user;
        next();
    } catch {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};