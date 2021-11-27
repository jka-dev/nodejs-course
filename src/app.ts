import express from 'express';
import logger from './logger';
import { config } from './config';
import { NextFunction, Request, Response } from "express";
import rootRouter from './routes';
import authRouter from './routes/auth';
import { authorize } from './middleware/authorize';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info({
        url: req.url,
        params: req.params,
        message: "Request info",
      });
    next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Content-Type', 'application/json');
  next();
});

app.use('/auth', authRouter);

app.use(authorize);

app.use('/', rootRouter);

app.get("*", (req, res) => {
    res.status(404).send('Not found');
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error('Error:', origin, err);
    if (res.headersSent) {
        return next(err)
    }
    res.status(500);
    res.render('error', { error: err })
});

app.listen(config.APP_PORT, () => {
    logger.info(`Server is listening on port ${config.APP_PORT}. Env is ${config.ENV}`); 
});

process.on('uncaughtException', (err, origin) => {
    logger.error({ message: "uncaughtException", err, origin });
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error({ message: "unhandledRejection", reason, promise });
});