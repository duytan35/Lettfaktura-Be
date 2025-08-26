import { Sequelize } from "sequelize";
import config from "./env.js";
import logger from "./logger.js";

const sequelize = new Sequelize({
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB_NAME,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  dialect: "postgres",
  logging:
    config.NODE_ENV === "development" ? (msg) => logger.debug(msg) : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connection established successfully");
  } catch (error) {
    logger.error("Unable to connect to database:", error);
    throw error;
  }
};

export { sequelize };
