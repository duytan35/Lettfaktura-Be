import Fastify from "fastify";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { config, logger } from "./config/index.js";
import { registerSwagger } from "./plugins/swagger.js";
import { registerCors } from "./plugins/cors.js";
import productRoutes from "./modules/product/product.routes.js";
import { errorHandler } from "./common/middlewares/errorHandler.js";

export const buildApp = () => {
  const fastify = Fastify({
    logger: config.NODE_ENV === "development",
    ajv: {
      customOptions: {
        removeAdditional: "all",
        coerceTypes: true,
        useDefaults: true,
      },
    },
  });

  // Error handler
  fastify.setErrorHandler(errorHandler);

  // Register plugins
  const registerPlugins = async () => {
    await fastify.register(helmet);
    await registerCors(fastify);
    await fastify.register(rateLimit, {
      max: 100,
      timeWindow: "1 minute",
    });
    await registerSwagger(fastify);
  };

  // Register routes
  const registerRoutes = async () => {
    // Health check
    fastify.get(
      "/health",
      {
        schema: {
          tags: ["Health"],
          summary: "Health check endpoint",
        },
      },
      async () => ({
        status: "OK",
        timestamp: new Date().toISOString(),
        environment: config.NODE_ENV,
        uptime: process.uptime(),
      })
    );

    // API routes
    await fastify.register(productRoutes, { prefix: "/api/v1" });
  };

  // Initialize app
  const init = async () => {
    await registerPlugins();
    await registerRoutes();
  };

  return { fastify, init };
};
