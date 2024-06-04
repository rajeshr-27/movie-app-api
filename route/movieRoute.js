const express = require('express');
const { addMovie, upload,updateMovie , getMovies, deleteMovie, getMovie} = require('../controller/movieController');
const Router = express.Router();
//get Movies
Router.get('/list',getMovies)
//get Movie
Router.get('/movie-details/:id',getMovie);
//Add Movie
Router.post('/add',upload.single('image'),addMovie);
//Update Movie
Router.put('/edit/:id',upload.single('image'),updateMovie);
//delete movie
Router.delete('/delete/:id', deleteMovie);

module.exports = Router;