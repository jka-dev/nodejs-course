import { Movie } from "../types/movie";
import MovieModel from "./models/movie";

export class MoviesRepository {

    constructor() {}
    get = async (id: string) => {
        return await MovieModel.findById(id);
    };

    getAll = async ({filter, sortOrder, sortBy, limit, page} : {filter: string[], sortOrder: string, sortBy: string, limit: number, page: number}) => {
        return await MovieModel.find(filter)
            .sort({[sortBy]: sortOrder})
            .limit(limit)
            .skip(limit * (page - 1))
            .exec();
    };

    add = async (movie: Movie) => {
        const currentMovie = await MovieModel.findOne({Title: movie.Title});

        if(currentMovie) {
            throw new Error('Movie already exists');
        }
        const {_id} = await MovieModel.create(movie);
        return _id;
    };

    update = async (id: string, data: any) => {
        const currentMovie = await MovieModel.findById(id);
        if (!currentMovie) {
            throw new Error('Movie does not exist');
        }
        Object.keys(data).forEach(key => currentMovie[key] = data[key]);

        await currentMovie.save();
    }

    remove = async (id: string) => {
        await MovieModel.findByIdAndRemove(id);
    }

}