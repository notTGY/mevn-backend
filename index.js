const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());



const tickets = require('./db/tickets')

app.get('/api/tickets', (req, res) => {
  tickets.getAll().then(data => {
    res.json(data);
  }).catch(err => {
    res.status(500);
    res.json(error);
  });
});

app.post('/api/tickets', (req, res) => {
  json = req.body;
  if (json.filenames == '' || json.text == '' || json.type == '' || json.email == '') {
    res.status(500);
    res.json({message:'Invalid data'});
    return 1;
  }
  if (['bug', 'feature request', 'other mistake', 'hack'].filter(e=>e==json.type) == []) {
    res.status(500);
    res.json({message:'Invalid data'});
    return 2;
  }
  tickets.create(req.body).then(data => {
    res.json(data);
  }).catch(err => {
    res.status(500);
    res.json(err);
  });
});



const users = require('./db/users');

app.get('/api/users?email=<some_email>&password=<some_password>', (req, res) => {
  const userRequest = {email: req.query.email, password: req.query.password}
  users.countUsers(userRequest).then(data => {
    res.json(data);
  }).catch(err => {
    res.status(500);
    res.json(error);
  });
});

app.post('/api/users', (req, res) => {
  json = req.body;
  if (json.email.trim() == '' || json.password.trim() == '') {
    res.status(500);
    res.json({message:'Invalid data'});
    return 1;
  }
  if (users.countUsers(json.email.trim()) != 0) {
    res.status(500);
    res.json({message:'Invalid data'});
    return 2;
  }
  const newUser = {email:json.email.trim(),password:json.password.trim()};
  users.create(newUser).then(data => {
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
