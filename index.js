const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());

const sessions = require('./db/sessions');
const users = require('./db/users');
const tickets = require('./db/tickets');



app.get('/api/tickets', async (req, res) => {
  const token = req.query.token;

  const email = await sessions.checkPermissionToReadTicket(token);

  if (!email) {
    res.status(500);
    res.json({message:'Invalid token '+email});
    return 1;
  }

  tickets.getAll(email).then(data => {
    res.status(200);
    res.json(data);
    return 0;
  });
});


app.get('/api/ticketsUpdate', async (req, res) => {
  const token = req.query.token;
  const action = req.query.action;

  const email = await sessions.checkPermissionToReadTicket(token);

  if (!email) {
    res.status(500);
    res.json({message:'Invalid token '+email});
    return 1;
  }

  tickets.getAll(email).then(data => {
    res.status(200);
    res.json(data);
    return 0;
  });
});




app.post('/api/tickets', async (req, res) => {
  const json = req.body;
  const token = json.token;

  const cashe = await sessions.checkPermissionToCreateTicket(token);
  if (!cashe) {
    res.status(500);
    res.json({message:'Invalid token'});
    return 3;
  }

  if (json.filenames == '' || json.text == '' || json.type == '' || cashe == '' || json.email_to == '') {
    res.status(500);
    res.json({message:'Invalid data'});
    return 1;
  }
  if (['bug', 'feature request', 'other mistake', 'hack'].filter(e=>e==json.type) == []) {
    res.status(500);
    res.json({message:'Invalid data'});
    return 1;
  }
  if (users.countUsers({email:json.email_to}) == 0) {
    res.status(500);
    res.json({message:'Invalid data'});
    return 1;
  }

  const newTicket = {
    email:cashe,
    type:json.type,
    text:json.text,
    filenames:json.filenames,
    email_to:json.email_to
  };
  tickets.create(newTicket).then(data => {
    res.json(data);
  }).catch(err => {
    res.status(500);
    res.json(err);
  });
});


app.get('/api/users', async (req, res) => {
  const userRequest = {email: req.query.email, password: req.query.password};

  users.countUsers(userRequest).then(async (data) => {
    if (data.length == 1) {
      const newToken = await sessions.createNewSession(userRequest.email);
      res.status(201);
      res.json(newToken);
      return 0;
    } else {
      res.status(500);
      res.json({message:'Invalid data'});
      return 1;
    }
  });
});


app.get('/api/usersReg', async (req, res) => {
  json = { email : req.query.email, password : req.query.password };

  if (json.email.trim() == '' || json.password.trim() == '') {
    res.status(500);
    res.json({message:'Invalid data'});
    return 1;
  }
  const sum = await users.countUsersAsync(json.email.trim());
  if (sum.length != 0) {
    res.status(500);
    res.json({message:'Invalid data'});
    return 2;
  }

  const newUser = {
    email:json.email.trim(),
    password:json.password.trim()
  };
  users.create(newUser).then(async data => {
    const token = await sessions.createNewSession(json.email.trim());
    res.status(200);
    res.json(token);
  }).catch(err => {
    res.status(500);
    res.json(err);
  });
});



const port = process.env.PORT || 1000;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
