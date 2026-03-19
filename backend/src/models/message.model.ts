import mongoose from 'mongoose';

export interface Message {
    text: string;
    dateTime: Date;
}

export const MessageSchema = new mongoose.Schema<Message>({
    text: { type: String, required: true },
    dateTime: { type: Date, required: true, default: () => new Date() },
});