import { Response } from 'express';
import logger from '../logger';
import { UsersRepository } from '../repository/usersRepository';
import { AuthRequest } from '../types/auth';

export class UsersController {
  repository: UsersRepository;

  constructor(repository: UsersRepository) {
    this.repository = repository;
  }

  addFavourites = (req: AuthRequest, res: Response) => {
    try {
      const { favourites } = req.body;
      const { user } = req;

      if (!user) {
          res.status(404).json({ error: "Not found" });
          return;
      }

      user.favourites = user.favourites.concat(favourites);

      this.repository.update(user);

      res.status(201).json({ added: favourites });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
};