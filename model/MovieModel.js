const db = require('../config/dbConnection');
const MovieModel = {
    addMovie:async (postData) => {
        const current_date = new Date()
        await db.query("INSERT INTO movies(movie_name, movie_details, category, imdb, movie_link, image, actor,genre,music,release_date,created_at) values(?)",
    [
        [postData.movie_name, postData.movie_details, postData.category, postData.imdb, postData.movie_link, postData.image, postData.actor,  postData.genre,  postData.music, postData.release_date,current_date]
    ])
    },
    getMovie: async(id) => {
           
        const movieInfo = await db.query(
            `SELECT m.*,c.name as category_name FROM movies as m left join category as c ON c.id = m.category where m.id="`+id+`"`
        )
        return movieInfo[0][0];
    },
    getMovies: async(id) => {
        const movies = await db.query(
            `SELECT m.*,c.name as category_name,c.id as category_id FROM movies as m left join category as c ON c.id = m.category `
        )
        return movies[0];
    },
    updateMovie: async (id, postData) =>{
        const update_query  =  "UPDATE movies SET movie_name=?, movie_details=?, category=?, imdb=?,  movie_link=?,actor = ?,genre = ?,music =?,release_date =?,  image=? where id= ? "
        await db.query(
            update_query,
            [postData.movie_name, postData.movie_details, postData.category, postData.imdb, postData.movie_link, postData.actor,  postData.genre,  postData.music, postData.release_date, postData.image,id]
        )
    },
    deleteMovie: async (id) => {
        await db.query('DELETE FROM movies where id ="'+id+'" ');
    }
}
module.exports = MovieModel;