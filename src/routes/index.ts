import { Router } from 'express';
import moviesRouter from './movies';
import usersRouter from './users';

const rootRouter = Router();

rootRouter.use('/movies', moviesRouter);
rootRouter.use('/users', usersRouter);

export default rootRouter;