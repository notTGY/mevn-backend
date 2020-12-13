const db = require('./connection');

const sessions = db.collection('sessions');
const tickets = db.collection('tickets');

async function createNewSession(email) {
  const start = (new Date()).getTime();
  const finish = start + 60 * 60 * 1000;

  const token = '' + start + email + finish;

  const session = {token: token, email:email, finish_time:finish}
  sessions.insert(session);
  return token;
}

async function checkPermissionToReadTicket(token) {
  const cache = await  sessions.findOne({token:token});

  if (cache === {} || cache == null) {
    return 0;
  }

  const now = (new Date()).getTime();
  if (cache.finish_time < now) {
    return 0;
  }

  return cache.email;
}

async function checkPermissionToCreateTicket(token) {
  const cache = await sessions.findOne({token:token});

  if (cache == {} || cache == null) {
    return 0;
  }
  const now = (new Date()).getTime();
  if (cache.finish_time < now) {
    return 0;
  }
  return cache.email;
}

async function interactWithTicket(token, action, ticketId) {
  const cache = await sessions.findOne({token:token});

  if (cache == {} || cache == null) {
    return 0;
  }
  const now = (new Date()).getTime();
  if (cache.finish_time < now) {
    return 0;
  }
  const tick = await tickets.findOne({_id:ticketId});

  if (tick == {} || tick == null) {
    return 0;
  }

  if (tick.email == cache.email) {
    return 1;
  }

  if (tick.email_to == cache.email) {
    if (!action) {
      return 0;
    }
    if (action.type == 'sendBack') {
      if (action.text) {
        return 1;
      }
    }
  }
  return 0;
}


async function checkToken(token) {
  const cache = await sessions.findOne({token:token});

  if (cache == {} || cache == null) {
    return 0;
  }
  const now = (new Date()).getTime();
  if (cache.finish_time < now) {
    return 0;
  }
  return cache.email;
}

module.exports = {
  checkPermissionToReadTicket,
  createNewSession,
  checkPermissionToCreateTicket,
  interactWithTicket,
  checkToken
};
