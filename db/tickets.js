const db = require('./connection');

 const tickets = db.get('tickets');

 function getAll () {
   return tickets.find();
 }

 function create (ticket) {
   return tickets.insert(ticket);
 }

 module.exports = {
   getAll,
   create
 }
