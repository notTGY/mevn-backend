const db = require('./connection');

const tickets = db.collection('tickets');

 async function getAll (email) {
   let a1 = await tickets.find({email:email});
   let a2 = await tickets.find({email_to:email});
   a1.forEach(e => {
     e.isYours = true;
   });

   a2.forEach(e => {
     e.isYours = false;
   });

   console.log(a1, a2);


   const arr = [...a1, ...a2];
   return arr;
 }

 async function create (ticket) {
   await tickets.insert(ticket);
 }

 module.exports = {
   getAll,
   create
 }
