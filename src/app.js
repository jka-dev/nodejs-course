const http = require('http');
const config = require('./config');
const logger = require('./logger');
const { APP_PORT, ENV } = config;

const app = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({body: 'Hello World!!!'}));
}); 

app.listen(APP_PORT, () => {
    logger.info(`Server is listening on port ${APP_PORT}. Env is ${ENV}`); 
});