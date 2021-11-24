const ENV = process.argv.slice(2) || "EMPTY_ARGS";
const APP_PORT = process.env.APP_PORT || 8080;
const apiKey = '2663878';
const OMDB_API_URI = `https://www.omdbapi.com/?apikey=${apiKey}`
const CONNECTION_STRING = 'mongodb://localhost:27017/MoviesDB';

export const config = {
  APP_PORT,
  ENV,
  OMDB_API_URI,
  CONNECTION_STRING
};