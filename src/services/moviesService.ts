import { config } from '../config';
import axios from "axios";

export class MovieService {
    static async searchMovie(title: string) {
        const { data } = await axios.get(`${config.OMDB_API_URI}&t=${title}`);
        return data.Error ? null : data;
    }
}