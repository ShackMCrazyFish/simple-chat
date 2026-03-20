import { Document, model, Model, Schema } from "mongoose";

export interface User {
    name: string;
    email: string;
    password_hash: string;
    created_at: Date;
    updated_at: Date;
}

export type UserDocument = User & Document;

export const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password_hash: { type: String, required: true },
    created_at: { type: Date, required: true, default: () => new Date() },
    updated_at: { type: Date, required: true, default: () => new Date() },
});

export const UserModel: Model<UserDocument> = model<UserDocument>('user', userSchema);