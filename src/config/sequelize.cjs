const config = require("./env.cjs");

module.exports = {
  development: {
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
};
