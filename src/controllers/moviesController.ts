import {Request, Response} from 'express';
import { MoviesRepository } from '../repository/moviesRepository';
import { MovieService } from '../services/moviesService';
import { Movie, MovieQuery } from '../types/movie';
import { v4 } from 'uuid';
import { AuthRequest } from '../types/auth';

export class MoviesController {
  repository: MoviesRepository;
  service: MovieService;

  constructor(repository: MoviesRepository, service: MovieService) {
      this.repository = repository;
      this.service = service;
  }

  getAll = (req: AuthRequest, res: Response) => {
    const {
      sortOrder = "asc",
      sortBy = "title",
      limit = 10,
      page = 1,
    } = req.query;

    const filter = req.user ? req.user.favourites : [];
    const movies = this.repository.getAll({
      filter,
      sortOrder,
      sortBy,
      limit,
      page,
    } as MovieQuery);
    res.json(movies);
  };

  getById = (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const movie = this.repository.get(id);
      res.json(movie);
    } catch (e) {
      res.sendStatus(404);
    }
  };

  post = async (req: Request, res: Response) => {
    const movie: Movie = req.body;
    movie.id = v4();
    const { title, ...restInfo } = movie;
    const encodedComponent = encodeURIComponent(title);
    const encodedName = encodedComponent.replace("%20", "+");
    try {
      const data = await MovieService.searchMovie(encodedName);
      this.repository.add(data ? { ...data, ...restInfo } : movie);
      res.json({ id: movie.id });
    } catch (e) {
      res.json(e);
    }
  };

  patch = (req: Request, res: Response) => {
    const { id } = req.params;
    const movie = req.body;
    try {
      this.repository.update(id, movie);
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(404);
    }
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      this.repository.remove(id);
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(404);
    }
  };
}