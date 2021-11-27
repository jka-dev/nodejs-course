import { NextFunction, Response, Request } from "express";
import { Jwt } from "jsonwebtoken";
import { UsersRepository } from "../repository/usersRepository";
import { JwtService } from "../services/jwtService";
import { AuthRequest } from "../types/auth";

export const authorize = (req: AuthRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  const jwtService = new JwtService();
  const usersRepository = new UsersRepository();

  const authToken = authorization.split(" ")[1];

  const userPayload = jwtService.verifyAccessToken(authToken) as Jwt;

  if (!userPayload) {
    res.status(422).json({ error: "Invalid authorization token" });
    return;
  }

  req.user = usersRepository.getById(userPayload.payload.id);

  next();
};
