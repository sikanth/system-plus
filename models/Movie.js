var mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
var mongoosePaginate = require('mongoose-paginate');
var async = require('async');
var moviesSchema = new mongoose.Schema({
    name: {type:String, unique : true},
    year:{type:Date},
    director:{type:String}
});


moviesSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("model", moviesSchema, "movie");