import app from './app';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    MONGO_URL: z.string(),
    PORT: z.string(),
    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string(),
    JWT_REFRESH_TOKEN_SECRET: z.string(),
    JWT_REFRESH_TOKEN_EXPIRES_IN: z.string(),
});


async function startServer() {
    const env = envSchema.parse(process.env);
    await mongoose.connect(env.MONGO_URL);
    const port = env.PORT ?? 3000;
    app.listen(port, () => {
        console.log(`Server on port ${port}`);
    });
}

startServer().catch((error) => {
    console.error('Error starting server', error);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    mongoose.connection.close();
    process.exit(0);
});

process.on('SIGTERM', () => {
    mongoose.connection.close();
    process.exit(0);
});

