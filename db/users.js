const db = require('./connection');

const users = db.collection('users');

async function countUsers (e) {
  let res = await users.find(e);
  return res;
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
