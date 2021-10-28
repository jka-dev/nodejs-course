const ENV = process.argv.slice(2) || "EMPTY_ARGS";
const APP_PORT = process.env.APP_PORT || 8080;

const config = {
    APP_PORT,
    ENV,
};

module.exports = config;