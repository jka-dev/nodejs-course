import express from 'express';
import { AuthController } from '../controllers/authController';
import { UsersRepository } from '../repository/usersRepository';
import { JwtService } from '../services/jwtService';

const router = express.Router();
const repository = new UsersRepository();
const service = new JwtService();
const controller = new AuthController(repository, service);

router.post('/login', controller.login);
router.post('/registration', controller.register);

export default router;