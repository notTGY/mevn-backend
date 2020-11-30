const db = require('./connection');

const users = db.collection('users');

function countUsers (e) {
  return users.find({email:e.email,password:e.password});
}

function countUsersByEmail (e) {
  return users.find({email:e});
}

function create (user) {
  return users.insert(user);
}

async function countUsersAsync (e) {
    return users.find({email:e});
}

module.exports = {
  countUsers,
  create,
  countUsersByEmail,
  countUsersAsync
}
