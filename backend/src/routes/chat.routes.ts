import express from 'express';
import { ChatModel } from '../models/chat.model';
import { ChatController } from '../controllers/chat.controller';
import { ChatService } from '../services/chat.service';
const router = express.Router();

const chatService = new ChatService(ChatModel);
const chatController = new ChatController(chatService);

// GET request to get all chats
router.get('/', (req, res) => {
    chatController.getChats(req, res);
});

// POST request to add a new message to a chat
router.post('/:chatId', (req, res) => {
    chatController.addMessage(req, res);
});

export default router;