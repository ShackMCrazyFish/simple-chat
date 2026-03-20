import express from 'express';
import cors from 'cors';
import chatRouter from './routes/chat.routes';
import authRouter from './routes/auth.routes';
import { authMiddleware } from './middleware/auth.middleware';

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/v1/api/auth', authRouter);
app.use('/v1/api/chats', authMiddleware, chatRouter);

export default app;