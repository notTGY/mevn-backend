const db = require('./connection');

const sessions = db.collection('sessions');

async function createNewSession(email) {
  let token = '';
  const start = (new Date()).getTime();
  const finish = start + 60 * 60;

  token += start + email + finish;

  const session = {token: token, email:email, finish_time:finish}
  sessions.insert(session);
  return token;
}

async function checkPermissionToReadTicket(token) {
  const cashe = sessions.findOne({token:token});

  if (cashe === {}) {
    return 0;
  }

  const now = (new Date()).getTime();
  if (cashe.finish < now) {
    return 0;
  }

  return cashe.email;
}

async function checkPermissionToCreateTicket(token) {
  const cashe = sessions.findOne({token:token});
  if (cashe === {}) {
    return 0;
  }
  const now = (new Date()).getTime();
  if (cashe.finish < now) {
    return 0;
  }
  return cashe.email;
}


module.exports = {
  checkPermissionToReadTicket,
  createNewSession,
  checkPermissionToCreateTicket
};
