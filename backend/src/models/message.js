import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({text: String, dateTime: Date});

export default mongoose.model('message', messageSchema);