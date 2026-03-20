import { Model } from "mongoose";
import { Chat, ChatDocument } from "../models/chat.model";

export class ChatService {
    constructor(private readonly chatModel: Model<ChatDocument>) {}

    async getChats(): Promise<Chat[]> {
        return await this.chatModel.find({}).lean().exec();
    }

    async addMessage(chatId: string, message: string): Promise<Chat | null> {
        if (!message.trim()) {
            throw new Error('Message is empty');
        }

        const updated = await this.chatModel
            .findByIdAndUpdate(
                chatId, 
                {
                    $push: { 
                        messages: {
                            text: message, 
                            dateTime: new Date()
                        },
                    },
                }, 
                { new: true })
            .lean()
            .exec();

        if (!updated) {
            throw new Error('Chat not found');
        }

        return updated;
    }
}