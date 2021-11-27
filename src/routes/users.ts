import express from 'express';
import { UsersController } from '../controllers/usersController';
import { UsersRepository } from '../repository/usersRepository';

const router = express.Router();
const repository = new UsersRepository();
const controller = new UsersController(repository);

router.patch('/favourites', controller.addFavourites);

export default router;