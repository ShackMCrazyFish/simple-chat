import { Model } from "mongoose";
import { UserDocument } from "src/models/user.model";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export class AuthService {
    constructor(private readonly userModel: Model<UserDocument>) {}

    async register(name: string, email: string, password: string): Promise<any> {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await this.userModel.findOne({ email });
        
        if (user) {
            throw new Error('User already exists');
        }

        const newUser = await this.userModel.create({ name, email, passwordHash });

        return this.tokenSign(newUser);
    }

    async login(email: string, password: string): Promise<any> {
        const user = await this.userModel.findOne({ email });
        
        if (!user) {
            throw new Error('Invalid login or password');
        }
        
        const passwordHash = await bcrypt.hash(password, 10);

        if (user.password_hash !== passwordHash) {
            throw new Error('Invalid login or password');
        }

        return this.tokenSign(user);
    }

    async refreshToken(refreshToken: string): Promise<any> {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET as string);
        
        if (!decoded) {
            throw new Error('Invalid refresh token');
        }

        const user = await this.userModel.findOne({ email: (decoded as any).user.id });

        if (!user) {
            throw new Error('User not found');
        }

        return this.tokenSign(user);
    }

    private async tokenSign(user: UserDocument) {
        const payload = { user: {name: user.name, email: user.email, admin: false}};
        return {
            accessToken: jwt.sign(
                payload,
                process.env.JWT_SECRET as string,
                { expiresIn: process.env.JWT_EXPIRES_IN as unknown as number }
            ),
            refreshToken: jwt.sign(
                payload,
                process.env.JWT_REFRESH_TOKEN_SECRET as string,
                { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as unknown as number }
            )
        }
    }
}