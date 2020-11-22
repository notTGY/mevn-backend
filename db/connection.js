const monk = require('monk');

const password = process.env.DBPASSWORD || require('../secrets').password;

const uri = `mongodb+srv://DBO:${password}@cluster0.5xlpu.mongodb.net/mevn-crud-app-1?retryWrites=true&w=majority`;

const db = monk(uri);

module.exports = db;
