const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chatRouter = require('./routes');

dotenv.config();

const app = require('express')();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        mongoose.set('debug', true);
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
        // Optional: Retry logic
        setTimeout(() => {
            mongoose.connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                mongoose.set('debug', true);
                console.log('Connected to MongoDB after retry');
            })
            .catch((err) => {
                console.error('Retry connection to MongoDB failed', err);
                process.exit(1);
            });
        }, 5000);
    });

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use('/v1/api/chats', chatRouter);

// Graceful shutdown
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose connection closed through app termination');
        process.exit(0);
    });
});

app.listen(3000, () => {
    console.log('Server on port 3000');
});
