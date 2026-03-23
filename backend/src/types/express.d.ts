import type { AuthTokenPayload } from './auth-token-payload';

declare global {
    namespace Express {
        interface Request {
            authUser?: AuthTokenPayload['user'];
        }
    }
}

export {};
