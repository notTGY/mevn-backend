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

 module.exports = {
   countUsers,
   create,
   countUsersByEmail
 }
