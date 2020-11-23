const db = require('./connection');

const tickets = db.collection('tickets');

 async function getAll (email) {
   return [...tickets.find({email:email}), ...tickets.find({email_to:email})];
 }

 function create (ticket) {
   return tickets.insert(ticket);
 }

 module.exports = {
   getAll,
   create
 }
