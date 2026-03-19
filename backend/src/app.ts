import cors from 'cors';
import chatRouter from './routes/index';
import express from 'express';

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use('/v1/api/chats', chatRouter);

export default app;