// const asyncHandler = require('express-async-handler');
// const multer = require('multer');
// const MovieModel = require('../model/MovieModel');
// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'uploads/')
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname);
//     }
// })

// const upload = multer({storage});
// //@desc Get Movies
// //Method GET /api/movie/list
// //Access public
// const getMovies = asyncHandler( async(req,res) => {

//     const movies = await MovieModel.getMovies();
//     const json_data = {
//         status:1,
//         message:"success",
//         movies:movies
//     }
//     res.status(200).json(json_data);
// })

// //@desc Get Movie
// //Method GET /api/movie/movie-details/:id
// //Access public
// const getMovie = asyncHandler( async(req,res) => {
//     const {id} = req.params;
//     const movie = await MovieModel.getMovie(id);
//     if(!movie){
//         res.status(404);
//         throw new Error('Movie not found');
//     }
//     const json_data = {
//         status:1,
//         message:"success",
//         movie:movie
//     }
//     res.status(200).json(json_data);
// })


// //@desc Add movie
// //Method POST /api/movie/add
// //Access public

// const addMovie = asyncHandler( async(req,res)=>{
//     const postData = JSON.parse(req.body.data);
//     const {movie_name, category, movie_link } = postData;
//     if(!movie_name || !category || !movie_link ){
//         res.status(400);
//         throw new Error('Enter the mandatory fields');
//     }
//     if(req.file){
//         postData.image = req.file.filename
//     }else {
//         postData.image = '';
//     }
//     //Add the movie
//     await MovieModel.addMovie(postData);
//     const json_data = {
//         status:1,
//         message:"Movie added successfully",
//     }
//     res.status(200).json(json_data);
// })

// //@desc Update movie
// //Method PUT /api/movie/edit/:id
// //Access public

// const updateMovie = asyncHandler( async(req,res) => {
//     const {id} = req.params;
//     const postData = JSON.parse(req.body.data);
//     const {movie_name, category, movie_link} = postData;
//     if(!movie_name || !category || !movie_link){
//         res.status(400);
//         throw new Error('Enter the required field');
//     }
//     const movieInfo = await MovieModel.getMovie(id);
//     if(!movieInfo){
//         res.status(404);
//         throw new Error('Movie not found');
//     }
//     if(req.file){
//         postData.image = req.file.filename;
//     }else {
//         postData.image = movieInfo.image;
//     }
//     //update movie
//     await MovieModel.updateMovie(id,postData);
//     const json_data = {
//         status:1,
//         message:"Movie update successfully"
//     }
//     res.status(200).json(json_data);
// })
// //@desc delete movie
// //Method DELETE /api/movie/delete/:id
// //Access public
// const deleteMovie = asyncHandler( async(req,res) => {
//     const {id} = req.params;
//     //check movie
//     const movieInfo = await MovieModel.getMovie(id);
//     if(!movieInfo){
//         res.status(404); 
//         throw new Error('Movie not found');
//     }
//     //delete movie
//     await MovieModel.deleteMovie(id);
//     const json_data = {
//         status:1,
//         message:"Movie deleted successfully"
//     }
//     res.status(200).send(json_data);

// })

// module.exports = {addMovie,upload, updateMovie, getMovies, deleteMovie, getMovie}


const asyncHandler = require('express-async-handler');
const multer = require('multer');
const MovieModel = require('../model/Movie');
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})

const upload = multer({storage});
//@desc Get Movies
//Method GET /api/movie/list
//Access public
const getMovies = asyncHandler( async(req,res) => {
    const search = req.query.q || "";
    
    let where = {}
    if(search){ 
        where.movie_name = {
            $regex:search,
            $options:"i" 
         }
    }
    const category = req.query.category || "";
    if(category){ 
        where.category = category
    }
    console.log(where);
    const movies = await MovieModel.find(where).populate('category','name');
    const json_data = {
        status:1,
        message:"success",
        movies:movies
    }
    res.status(200).json(json_data);
})

//@desc Get Movie
//Method GET /api/movie/movie-details/:id
//Access public
const getMovie = asyncHandler( async(req,res) => {
    const {id} = req.params;
    const movie = await MovieModel.findById(id).populate('category','name');
    if(!movie){
        res.status(404);
        throw new Error('Movie not found');
    }
    const json_data = {
        status:1,
        message:"success",
        movie:movie
    }
    res.status(200).json(json_data);
})


//@desc Add movie
//Method POST /api/movie/add
//Access public

const addMovie = asyncHandler( async(req,res)=>{
    const postData = JSON.parse(req.body.data);
    const {movie_name, category, movie_link } = postData;
    if(!movie_name || !category || !movie_link ){
        res.status(400);
        throw new Error('Enter the mandatory fields');
    }
    if(req.file){
        postData.image = req.file.filename
    }else {
        postData.image = '';
    }
    //Add the movie
    await MovieModel.create(postData);
    const json_data = {
        status:1,
        message:"Movie added successfully",
    }
    res.status(200).json(json_data);
})

//@desc Update movie
//Method PUT /api/movie/edit/:id
//Access public

const updateMovie = asyncHandler( async(req,res) => {
    const {id} = req.params;
    const postData = JSON.parse(req.body.data);
    const {movie_name, category, movie_link} = postData;
    if(!movie_name || !category || !movie_link){
        res.status(400);
        throw new Error('Enter the required field');
    }
    const movieInfo = await MovieModel.findById(id);
    if(!movieInfo){
        res.status(404);
        throw new Error('Movie not found');
    }
    if(req.file){
        postData.image = req.file.filename;
    }else {
        postData.image = movieInfo.image;
    }
    //update movie
    await MovieModel.findByIdAndUpdate(id,postData);
    const json_data = {
        status:1,
        message:"Movie update successfully"
    }
    res.status(200).json(json_data);
})
//@desc delete movie
//Method DELETE /api/movie/delete/:id
//Access public
const deleteMovie = asyncHandler( async(req,res) => {
    const {id} = req.params;
    //check movie
    const movieInfo = await MovieModel.findById(id);
    if(!movieInfo){
        res.status(404); 
        throw new Error('Movie not found');
    }
    //delete movie
    await MovieModel.findByIdAndDelete(id);
    const json_data = {
        status:1,
        message:"Movie deleted successfully"
    }
    res.status(200).send(json_data);

})

module.exports = {addMovie,upload, updateMovie, getMovies, deleteMovie, getMovie}

