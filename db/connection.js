const MongoClient = require('mongodb').MongoClient;

const password = require('../secrets').password;


const uri = `mongodb+srv://DBO:${password}@cluster0.5xlpu.mongodb.net/<dbname>?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("mevn-crud-app-1").collection("tickets");
});


module.exports = {
  db
};
