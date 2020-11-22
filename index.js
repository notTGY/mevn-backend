const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const tickets = require('./db/tickets')

app.use(bodyParser.json());

app.get('/api/tickets', (req, res) => {
  tickets.getAll().then(data => {
    res.json(data);
  }).catch(err => {
    res.status(500);
    res.json(error);
  });
});


app.post('/api/tickets', (req, res) => {
  tickets.create(req.body).then(data => {
    res.json(data);
  }).catch(err => {
    res.status(500);
    res.json(err);
  });
});

const port = process.env.PORT || 1000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
