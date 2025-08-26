import ConfigController from "./config.controller.js";

export default async function configRoutes(fastify) {
  const configController = new ConfigController();

  fastify.get(
    "/config",
    {
      schema: {
        tags: ["Config"],
        summary: "Get active configuration",
        description: "Retrieve the currently active configuration",
        response: {
          200: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              data: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  languages: { type: "array" },
                  links: { 
                    type: "object",
                    additionalProperties: true
                  },
                  metadata: { 
                    type: "object",
                    additionalProperties: true
                  },
                  version: { type: "string" },
                  image: { type: "string" },
                  logo: { type: "string" },
                  isActive: { type: "boolean" },
                  createdAt: { type: "string", format: "date-time" },
                  updatedAt: { type: "string", format: "date-time" },
                },
              },
            },
          },
        },
      },
    },
    configController.getActiveConfig
  );
}
