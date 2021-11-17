import { createServer, IncomingMessage, ServerResponse } from 'http';
import { config } from './config';
import logger from './logger';

createServer(async (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({body: 'Hello World!!! TS'}))
    } else if (req.method === "POST") {
        const chunks: Buffer[] = [];
        let body: Record<string, unknown> | null = null;
        req.on('data', async (data) => {
            chunks.push(data);
            body = JSON.parse(data.toString());
        })
        .on('end', () => {
            const rawBody = Buffer.concat(chunks).toString();
            body = JSON.parse(rawBody);
            logger.info(body)
            logger.info(chunks.length);
            res.end(rawBody);
        });
    }
}).listen(config.APP_PORT, () => {
    logger.info(`Server is listening on port ${config.APP_PORT}. Env is ${config.ENV}`); 
});