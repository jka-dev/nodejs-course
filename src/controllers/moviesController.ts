import {Request, Response} from 'express';
import { MoviesRepository } from '../repository/moviesRepository';
import { MovieService } from '../services/moviesService';
import { Movie, MovieQuery } from '../types/movie';
import { AuthRequest } from '../types/auth';
import { ObjectId } from 'mongodb';

export class MoviesController {
  repository: MoviesRepository;
  service: MovieService;

  constructor(repository: MoviesRepository, service: MovieService) {
      this.repository = repository;
      this.service = service;
  }

  getAll = async (req: AuthRequest, res: Response) => {
    const {
      sortOrder = "asc",
      sortBy = "title",
      limit = 10,
      page = 1,
    } = req.query;

    const favourites = req.user?.favourites.map((fav: any) => new ObjectId(fav));
    const filter = req.user ? {_id: { $in: favourites}} : {};
    const movies = await this.repository.getAll({
      filter,
      sortOrder,
      sortBy,
      limit,
      page,
    } as MovieQuery);
    
    res.json(movies);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const movie = await this.repository.get(id);
      res.json(movie);
    } catch (e) {
      res.sendStatus(404);
    }
  };

  post = async (req: Request, res: Response) => {
    const movie: Movie = req.body;
    const { title, ...restInfo } = movie;
    const encodedComponent = encodeURIComponent(title);
    const encodedName = encodedComponent.replace("%20", "+");
    try {
      const data = await MovieService.searchMovie(encodedName);

      await this.repository.add(data ? { ...data, ...restInfo } : movie);
      res.status(201).json({ title });
    } catch (e) {
      res.json(e);
    }
  };

  patch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const movie = req.body;
    try {
      await this.repository.update(id, movie);
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(404);
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await this.repository.remove(id);
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(404);
    }
  };
}