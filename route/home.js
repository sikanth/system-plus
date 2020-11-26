var express = require('express');
var router = express.Router();



var moviesController = require('../controller/movies');

router.post('/movie',  moviesController.record);
router.post('/movies',  moviesController.records);
router.get('/movies/:id',  moviesController.getmovie);

module.exports=router;


