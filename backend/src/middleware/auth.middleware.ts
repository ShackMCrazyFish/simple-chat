import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const authSchema = z.object({
    token: z.string(),
});

const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = authSchema.parse(req.headers);
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}