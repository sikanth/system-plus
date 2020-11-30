require('stackify-node-apm');
const express = require('express')
const app = express()
var normalizePort = require('normalize-port');
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var bodyParserError = require('bodyparser-json-error');
var routes = require('./route/home');
var mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
const { url } = require('inspector');
var stackify = require('stackify-logger');
app.use(bodyParser.urlencoded({
    extended: true
}));
var db = process.env.MONGODB || 'mongodb+srv://srikanth:ktNHcwFdhRcval8w@system.ir9my.mongodb.net/system-plus?retryWrites=true&w=majority';
app.use(bodyParser.json());
app.use(bodyParserError.beautify());
app.use(stackify.expressExceptionHandler);
 mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
 mongoose.connection.on('open', function () {
    console.log('MongoDB Connected.');
});
mongoose.connection.on('error', function () {
    console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});



// const uri = "mongodb+srv://srikanth:ktNHcwFdhRcval8w@system.ir9my.mongodb.net/sample-training?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("sample-training").collection("companies");
//   // perform actions on the collection object
//   client.close();
// });



app.listen(port, () => console.log("server running port at. :" + port));
app.use('/', routes)
stackify.start({apiKey: '8Xj6Nn0Vc5Qm5Eb4Nb2Wt3Ti4Ur0Ah1Xt2Qc1Lw', appName: 'system', env: 'test', debug: true});
module.exports = app;