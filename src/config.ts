const ENV = process.argv.slice(2) || "EMPTY_ARGS";
const APP_PORT = process.env.APP_PORT || 8080;

export const config = {
  APP_PORT,
  ENV,
};