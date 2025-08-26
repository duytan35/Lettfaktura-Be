import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { config } from "../config/index.js";

export const registerSwagger = async (fastify) => {
  await fastify.register(swagger, {
    swagger: {
      info: {
        title: "Lettfaktura API",
        description: "API documentation for Lettfaktura backend",
        version: "1.0.0",
      },
      host: `localhost:${config.PORT}`,
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  });

  await fastify.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
  });
};
