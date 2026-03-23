import type { JwtPayload } from 'jsonwebtoken';

export type AuthTokenPayload = JwtPayload & {
    user: {
        id: string;
        name: string;
        email: string;
        admin: boolean;
    };
};
