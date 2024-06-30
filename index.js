const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/simple-chat');
mongoose.set('debug', true);

const app = require('express')();

const messageModel = mongoose.model('message', {
    mess: String
});

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.get('/', (req, res) => {

    messageModel.find({})
        .then((data) => {
            res.json(data);
        }).catch((err) => {
        console.log(err);
        res.status(500).json({code: 500, message: 'Internal server error'});
    })
});

app.post('/', (req, res) => {
    if (req.body.mess) {
        messageModel.create({mess: req.body.mess})
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
