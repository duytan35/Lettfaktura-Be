import { buildApp } from "./app.js";
import { config, connectDatabase, logger } from "./config/index.js";

const start = async () => {
  try {
    // Connect to database
    await connectDatabase();

    // Build and initialize app
    const { fastify, init } = buildApp();
    await init();

    // Start server
    await fastify.listen({
      port: config.PORT,
      host: "0.0.0.0",
    });

    logger.info(`🚀 Server running on port ${config.PORT}`);
    logger.info(`📝 Environment: ${config.NODE_ENV}`);
    logger.info(`📚 API Documentation: http://localhost:${config.PORT}/docs`);
    logger.info(`💚 Health Check: http://localhost:${config.PORT}/health`);

    // Graceful shutdown
    const gracefulShutdown = async (signal) => {
      logger.info(`${signal} received, shutting down gracefully`);
      try {
        await fastify.close();
        process.exit(0);
      } catch (error) {
        logger.error("Error during shutdown:", error);
        process.exit(1);
      }
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  } catch (error) {
    logger.error("❌ Failed to start server:", error);
    console.error(error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

start();
