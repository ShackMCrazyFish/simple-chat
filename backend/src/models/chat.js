import mongoose from 'mongoose';
import { messageSchema } from './message';

const chatSchema = new mongoose.Schema({
    messages: [messageSchema],
});

export default mongoose.model('chat', chatSchema);