import express from 'express';
import { MoviesController } from '../controllers/moviesController';
import { MoviesRepository } from '../repository/moviesRepository';
import { MovieService } from '../services/moviesService';

const router = express.Router();
const repository = new MoviesRepository();
const service = new MovieService();
const controller = new MoviesController(repository, service);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.post);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.delete);

export default router;