import {Schema, model} from 'mongoose';

const MovieSchema = new Schema({
    "Title": String,
    "Year": String,
    "Rated": String,
    "Released": String,
    "Runtime": String,
    "Genre": String,
    "Director": String,
    "Writer": String,
    "Actors": String,
    "Plot": String,
    "Language": String,
    "Country": String,
    "Awards": String,
    "Poster": String,
    "Ratings": [{"Source": String, "Value": String}],
    "Metascore": String,
    "imdbRating": String,
    "imdbVotes": String,
    "imdbID": String,
    "Type": String,
    "DVD": String,
    "BoxOffice": String,
    "Production": String,
    "Website": String,
    "Response": String,
    "comment": String,
    "personalScore": Number,
    "name": String
});

const MovieModel = model("Movies", MovieSchema);

export default MovieModel;