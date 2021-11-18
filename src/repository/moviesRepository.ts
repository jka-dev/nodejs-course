import { Movie } from "../types/movie";
import { paginate } from "../utils/paginate";
import { sort } from "../utils/sort";
import { moviesList } from "./moqMoviesData";

export class MoviesRepository {

    constructor() {}
    get = (id: string) => {
        return moviesList.items[id];
    };

    getAll = ({sortOrder, sortBy, limit, page} : { sortOrder: string, sortBy: string, limit: number, page: number}): Movie[] => {
        const movies = Object.values(moviesList.items);
        const sortedMovies = sort(movies, sortOrder, sortBy);
        return paginate(sortedMovies, limit, page);
    };

    add = (movie: Movie): void => {
        const currentMovie = this.get(movie.id);
        if(currentMovie) {
            throw new Error('Movie already exists');
        }
        moviesList.items[movie.id] = {...movie};
        moviesList.total++;
    };

    update = (id: string, data: any): void => {
        const currentMovie = this.get(id);
        if (!currentMovie) {
            throw new Error('Movie does not exist');
        }
        moviesList.items[id] = {...currentMovie, ...data};
    }

    remove = (id: string): void => {
        delete moviesList.items[id];
        moviesList.total--;
    }

}