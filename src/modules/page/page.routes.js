import PageController from "./page.controller.js";

export default async function pageRoutes(fastify) {
  const pageController = new PageController();

  // Get specific page by key and locale: /api/v1/locales/:key/:locale
  fastify.get(
    "/locales/:key/:locale",
    {
      schema: {
        tags: ["Pages"],
        summary: "Get page by key and locale",
        description: "Retrieve a specific page content for a given locale",
        params: {
          type: "object",
          properties: {
            key: {
              type: "string",
              description: "Page key (e.g., 'terms')"
            },
            locale: {
              type: "string",
              description: "Locale code (e.g., 'english', 'svenska')"
            }
          },
          required: ["key", "locale"]
        },
        response: {
          200: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              data: { 
                type: "object",
                additionalProperties: true
              }
            }
          }
        }
      }
    },
    pageController.getPageByLocale
  );

  // Get all pages for a specific locale: /api/v1/locales/:locale
  fastify.get(
    "/locales/:locale",
    {
      schema: {
        tags: ["Pages"],
        summary: "Get all pages for a locale",
        description: "Retrieve all page content for a given locale",
        params: {
          type: "object",
          properties: {
            locale: {
              type: "string",
              description: "Locale code (e.g., 'english', 'svenska')"
            }
          },
          required: ["locale"]
        },
        response: {
          200: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              data: { 
                type: "object",
                additionalProperties: true
              }
            }
          }
        }
      }
    },
    pageController.getAllPagesForLocale
  );
}