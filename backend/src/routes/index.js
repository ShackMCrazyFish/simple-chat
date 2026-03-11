import express from 'express';
import Chat from '../models/chat';
const router = express.Router();

// GET request to get all chats
router.get('/', async (req, res) => {
    try {
        const chats = await Chat.find({});
        res.status(200).json(chats);
    } catch (err) {
        console.error('Error getting chats', err);
        res.status(500).json({error: 'Internal server error'});
    }
});

// POST request to add a new message to a chat
router.post('/:chatId', async (req, res) => {
    const chat = await Chat.findOne({_id: req.params.chatId});
    
    if (!chat) {
        res.status(404).json({message: 'Chat not found'});
        return;
    }

    if (req.body.text) {
        chat.messages.push({text: req.body.text});
        chat.save()
            .then(() => {res.status(200).json({code: 200, message: 'OK'})})
            .catch((err) => {
                console.error('Error saving chat', err);
                res.status(500).json({message: 'Internal server error'});
        });
    } else {
        res.status(400).json({code: 400, message: 'Message is required'});
    }
});

export default router;