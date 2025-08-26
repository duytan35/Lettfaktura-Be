import dotenv from "dotenv";

dotenv.config();

const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT) || 3000,

  // Database
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: parseInt(process.env.DB_PORT) || 5432,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
};

// Validate required environment variables
const requiredVars = ["DB_NAME", "DB_USER", "DB_PASSWORD"];
for (const varName of requiredVars) {
  const configKey = varName.replace("DB_", "").toLowerCase();
  if (
    !config[
      configKey === "name"
        ? "DB_NAME"
        : configKey === "user"
          ? "DB_USER"
          : "DB_PASSWORD"
    ]
  ) {
    throw new Error(`Environment variable ${varName} is required`);
  }
}

export default config;
