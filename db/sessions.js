const db = require('./connection');

const sessions = db.collection('sessions');

async function createNewSession(email) {
  const start = (new Date()).getTime();
  const finish = start + 60 * 60 * 1000;

  const token = '' + start + email + finish;

  const session = {token: token, email:email, finish_time:finish}
  sessions.insert(session);
  return token;
}

async function checkPermissionToReadTicket(token) {
  const cache = sessions.findOne({token:token});

  if (cache === {}) {
    return 0;
  }

  const now = (new Date()).getTime();
  if (cache.finish_time < now) {
    return 0;
  }

  return cache.email;
}

async function checkPermissionToCreateTicket(token) {
  const cashe = sessions.findOne({token:token});
  if (cashe === {}) {
    return 0;
  }
  const now = (new Date()).getTime();
  if (cashe.finish_time < now) {
    return 0;
  }
  return cashe.email;
}


module.exports = {
  checkPermissionToReadTicket,
  createNewSession,
  checkPermissionToCreateTicket
};
