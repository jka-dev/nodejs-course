import {Request, Response} from 'express';
import logger from '../logger';
import { UsersRepository } from '../repository/usersRepository';
import { JwtService } from '../services/jwtService';
import bcrypt from "bcrypt";

export class AuthController {
  repository: UsersRepository;
  service: JwtService;

  constructor(repository: UsersRepository, service: JwtService) {
    this.repository = repository;
    this.service = service;
  }

  register = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.repository.get(email);

      if (user) {
        res.status(400).json({ error: "Email is already in use" });
        return;
      }

      const userId = await this.repository.add({ _id: null, email, password, role: "user", favourites: [] });
      res.status(201).json({ id: userId });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await this.repository.get(email);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      if (bcrypt.compareSync(password, user.password)) {
        res.status(403).json({ error: 'Wrong password' });
      }

      const { id, role } = user;

      const accessToken = this.service.generateAccessToken(id, role);

      res.json({ accessToken });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
  };
};