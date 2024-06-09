const mongoose = require('mongoose');
const MovieSchema = mongoose.Schema({
    movie_name:{
        type:String
    },
    movie_details:{
        type:String
    },
    category:{
        type:String,
        index:true,
        ref:'category'
    },
    imdb:{
        type:String
    },
    movie_link:{
        type:String
    },
    image:{
        type:String
    },
    actor:{
        type:String
    },
    genre:{
        type:String
    },
    music:{
        type:String
    },
    release_date:{
        type:String
    }
},
{
    timestamps :true
})

const Movie = mongoose.model('movies',MovieSchema);

module.exports = Movie;