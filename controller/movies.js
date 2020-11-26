var Model = require('../models/Movie');
var mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
var async = require('async');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.home = function (req, res, next) {
    res.send("Home Directory");
}

/**
 * 
 * @param {*} req  endpoint: /movie, Payload:{"name":"srikant", "year":"2/21/2020", "director":"er"}
 * @param {*} res  "Record submitted succesfully"
 * @param {*} next 
 */
exports.record = function (req, res, next) {
    var data = req.body;
    try {
        if (data) {
            Model.find({
                "name": data.name
            }, function (err, result) {
                if (err) return (new Error(err));
                if (result.length > 0) {
                    res.send({'message':'Record ALready Exist'});
                    return next();
                } else {
                    var doc = new Model(data);

                    doc.save(function (err, result) {
                        if (err) next(new Error(err, "Something Went wrong Please try again"));
                        if(result){
                        res.send({'message':'Record submitted succesfully'});
                        }

                    });

                }
            });

        }
    } catch {
        next(new Error("Something Went wrong Please try again"));
        return next();
    }

}

/**
 * 
 * @param {*} req endpoint: /movies, Payload:[{"name":"test", "year":"2/21/2020", "director":"er"}, {"name":"srikant", "year":"2/21/2020", "director":"er"}]
 * @param {*} res "Succesfully inserted"
 * @param {*} next 
 */
exports.records = function (req, res, next) {
    var data = req.body;

    if (data) {

        data.forEach(function (element) {
            Model.find({
                "name": element.name
            }, function (err, result) {
                if (err) return (new Error(err));
                if (result.length > 0) {
                    return next();
                } else {
                    var doc = new Model(element);

                    doc.save(function (err, result, callback) {
                        if (err) next(new Error(err, "Something Went wrong Please try again"));
                        return next();
                    });

                }
            });


        });
        res.send({'message':'inserted'});

    }


}

/**
 * 
 * @param {*} req endpoint:movies/query?name=srikanth
 * @param {*} res  {
        "_id": "5fbe855cd3699a1eac4c49b2",
        "name": "srikanth",
        "year": "2020-02-20T18:30:00.000Z",
        "director": "arif",
        "__v": 0
    }
 * @param {*} next 
 */
exports.getmovie = function (req, res, next) {
    var id = req.query;
    var search = {}
    if (req.query.name) {
        search['name'] = req.query.name;
    }
    if (req.query.director) {
        search['director'] = req.query.director;
    }
    try {

        Model.find(search, function (error, obj) {
            if (error)
                return next(new Error(error, "Something Went wrong Please try again"));
                if(obj.length>0){
                    res.json(obj);
                    next();
                }else{
                    res.json({'message':'Records not found'});
                }
            
        });


    } catch {
        return next(new Error("Something Went wrong, Resend the request"));
    }
}