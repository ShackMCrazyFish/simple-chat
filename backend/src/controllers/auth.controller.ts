import { AuthService } from "src/services/auth.service";
import { Request, Response } from "express";
import z from "zod";

//validation schemas
const registerBodySchema = z.object({
    name: z.string().min(1).max(255),
    email: z.email().min(1).max(255),
    password: z.string().min(8).max(255).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
});

const loginBodySchema = z.object({
    email: z.email().min(1).max(255),
    password: z.string().min(8).max(255).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
});

export class AuthController {
    constructor(private readonly authService: AuthService) {}

    async register(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password } = registerBodySchema.parse(req.body);
            const user = await this.authService.register(name, email, password);
            res.status(201).json(user);
        } catch (err) {
            if (err instanceof z.ZodError) {
                res.status(400).json({ error: err.message, details: err.issues });
                return;
            }
            console.error('Error registering user', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = loginBodySchema.parse(req.body);
            const user = await this.authService.login(email, password);
            res.status(200).json(user);
        } catch (err) {
            if (err instanceof z.ZodError) {
                res.status(400).json({ error: err.message, details: err.issues });
                return;
            }
            console.error('Error logging in user', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
    }
}