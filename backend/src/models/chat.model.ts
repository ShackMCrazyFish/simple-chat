import { Document, Model, Schema, model } from 'mongoose';
import { Message, MessageSchema } from './message.model';

export interface Chat {
    messages: Message[];
}

export type ChatDocument = Chat & Document;

export const chatSchema = new Schema({
    messages: {type: [MessageSchema], default: []},
});

export const ChatModel: Model<ChatDocument> = model<ChatDocument>('chat', chatSchema);