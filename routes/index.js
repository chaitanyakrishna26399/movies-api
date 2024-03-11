var express = require('express');
var router = express.Router();
const moviesController=require('../controllers/movies')
const Validations=require('../joi/index')
/* GET home page. */
router.post('/movies',Validations.Addmovie,moviesController.addmovies );
router.get('/movies',moviesController.getmovies);
router.get('/search',moviesController.search);
router.put('/movies',Validations.Updatemovie,moviesController.updatemovie);
router.delete('/movies',Validations.Deletemovie,moviesController.DeleteMovie);
module.exports = router;