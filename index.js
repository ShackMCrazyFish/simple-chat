const bodyParser = require('body-parser');
const cors = require('cors');
const app = require('express')();

app.use(cors());

const db = {
  users: [],
  messages: [],
};

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json(db.messages);
});

app.post('/', (req, res) => {
  if (req.body.mess) {
    db.messages.push(req.body.mess)
  }
  res.json({code: 200, message: 'OK'});
});

app.listen(3000, () => {
  console.log('Server on port 3000');
});
