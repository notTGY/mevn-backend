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


   const arr = [...a1, ...a2];
   return arr;
 }

 async function create (ticket) {
   await tickets.insert(ticket);
 }

 async function performAction (ticketId, action) {
   if (action.type == 'delete') {
     await tickets.remove({_id:ticketId});
   }
   if (action.type == 'sendBack') {
    const tick = await tickets.findOne({_id:ticketId});
    const newText = tick.text + '\n' + action.text;

    await tickets.update({_id:ticketId}, { $set: {text: newText} })
   }
 }

 module.exports = {
   getAll,
   create,
   performAction
 }
