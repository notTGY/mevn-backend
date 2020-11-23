const db = require('./connection');

const users = db.collection('users');

function countUsers (e) {
  return users.count({'email':e.email,'password':e.password});
}

function countUsersByEmail (e) {
  return users.count({'email':e});
}

function create (user) {
  return users.insert(user);
}

async function countUsersAsync (e) {
    return users.count({'email':e.email,'password':e.password});
}

module.exports = {
  countUsers,
  create,
  countUsersByEmail,
  countUsersAsync
}
