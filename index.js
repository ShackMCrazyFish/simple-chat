const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/simple-chat');
mongoose.set('debug', true);

const app = require('express')();

const userModel = mongoose.model('user', {
    name: String,
    avatar: String,
});

const messageModel = mongoose.model('message', {
    text: String,
    dateTime: Date,
});

const chatModel = mongoose.model('chat', {
    messages: [messageModel],
});

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.get('/', (req, res) => {
    chatModel.find({})
        .then((data) => {
            res.json(data);
        }).catch((err) => {
        console.log(err);
        res.status(500).json({code: 500, message: 'Internal server error'});
    })
});

app.post('/:chatId', async (req, res) => {
    const chat = await chatModel.findOne({_id: req.params.chatId});
    console.log(chat);
    if (!chat) {
        res.status(404).json({code: 404, message: 'Chat not found'});
    }

    if (req.body.mess) {
        chat.messages.push({mess: req.body.mess})
            .then(() => {
                res.json({code: 200, message: 'OK'});
            }).catch((err) => {
            console.log(err);
            res.status(500).json({code: 500, message: 'Internal server error'});
        })
    }
});

app.listen(3000, () => {
    console.log('Server on port 3000');
});
