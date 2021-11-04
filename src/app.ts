import express from 'express';
import logger from './logger';
import { config } from './config';
import { exceptions } from 'winston';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req: any, res: any, next: (arg?: any) => void) => {
  res.header('Content-Type', 'application/json');
  next();
});

app.get("/", (req, res) => {
    Promise.reject(new Error('fake error')); 
    logger.info({
      url: req.url,
      params: req.params,
      message: 'Get request',
    });

    res.send(JSON.stringify({body: 'Hello World!!! TS-EXPRESS'}));
  });

app.post("/", (req, res) => {
    logger.info({
      url: req.url,
      params: req.params,
      message: "Post request",
    });
  
    const body = req.body;
    res.send(body);
  });

app.listen(config.APP_PORT, () => {
    logger.info(`Server is listening on port ${config.APP_PORT}. Env is ${config.ENV}`); 
});

process.on('uncaughtException', (err, origin) => {
    logger.error({ message: "uncaughtException", origin });
});
  
process.on('unhandledRejection', (reason, promise) => {
    logger.error({ message: "unhandledRejection", promise });
});