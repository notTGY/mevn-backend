const db = require('./connection');

const tickets = db.collection('tickets');

 async function getAll (email) {
   const a1 = await tickets.find({email:email});
   const a2 = await tickets.find({email_to:email});
   const arr = [...a1, ...a2];
   return arr;
 }

 function create (ticket) {
   return tickets.insert(ticket);
 }

 module.exports = {
   getAll,
   create
 }
