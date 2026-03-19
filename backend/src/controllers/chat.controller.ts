import { ChatService } from "../services/chat.service";
import { Request, Response } from "express";
import { z } from "zod";

const addMessageParamsSchema = z.object({
    chatId: z.string(),
});

const addMessageBodySchema = z.object({
    message: z.string(),
});

export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    async getChats(req: Request, res: Response): Promise<void> {
        try {
            const chats = await this.chatService.getChats();
            res.status(200).json(chats);
            return;
        } catch (err) {
            console.error('Error getting chats', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
    }

    async addMessage(req: Request, res: Response): Promise<void> {
        try {
            const { chatId } = addMessageParamsSchema.parse(req.params);
            const { message } = addMessageBodySchema.parse(req.body);
            const updatedChat = await this.chatService.addMessage(chatId, message);
            
            if (!updatedChat) {
                res.status(404).json({ error: 'Chat not found' });
                return;
            }

            res.status(200).json(updatedChat);
            return;
        } catch (err) {

            if (err instanceof z.ZodError) {
                res.status(400).json({ error: err.message, details: err.issues });
                return;
            }

            console.error('Error adding message', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
    }
}