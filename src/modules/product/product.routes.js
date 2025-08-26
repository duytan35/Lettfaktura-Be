import ProductController from "./product.controller.js";
import { 
  createBulkProductsSchema,
  createProductSchema,
  updateProductSchema,
  productParamsSchema 
} from "./product.schema.js";

export default async function productRoutes(fastify) {
  const productController = new ProductController();

  fastify.get(
    "/products",
    {
      schema: {
        tags: ["Products"],
        summary: "Get all products",
        description:
          "Retrieve products with optional pagination and search by articleNo and/or name",
        querystring: {
          type: "object",
          properties: {
            page: {
              type: "integer",
              minimum: 1,
              description: "Page number for pagination (optional)",
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 1000,
              description: "Number of items per page (optional, requires page)",
            },
            articleNo: {
              type: "string",
              minLength: 1,
              description:
                "Search by article number (case-insensitive partial match)",
            },
            name: {
              type: "string",
              minLength: 1,
              description:
                "Search by product name (case-insensitive partial match)",
            },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              data: {
                type: "object",
                properties: {
                  products: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "integer" },
                        articleNo: { type: "string" },
                        name: { type: "string" },
                        inPrice: { type: "number" },
                        price: { type: "number" },
                        unit: { type: "string" },
                        inStock: { type: "integer" },
                        description: { type: "string" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                      },
                    },
                  },
                  meta: {
                    type: "object",
                    properties: {
                      page: { type: "integer" },
                      limit: { type: "integer" },
                      total: { type: "integer" },
                      totalPages: { type: "integer" },
                    },
                    description:
                      "Pagination metadata (only present when using pagination)",
                  },
                },
              },
            },
          },
        },
      },
    },
    productController.getAllProducts
  );

  fastify.post(
    "/products/bulk",
    {
      schema: {
        tags: ["Products"],
        summary: "Create multiple products",
        description:
          "Create multiple products in a single request. All article numbers must be unique.",
        ...createBulkProductsSchema,
        response: {
          201: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "integer" },
                    articleNo: { type: "string" },
                    name: { type: "string" },
                    inPrice: { type: "number" },
                    price: { type: "number" },
                    unit: { type: "string" },
                    inStock: { type: "integer" },
                    description: { type: "string" },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
        },
      },
    },
    productController.createBulkProducts
  );

  fastify.get(
    "/products/:id",
    {
      schema: {
        tags: ["Products"],
        summary: "Get product by ID",
        description: "Retrieve a single product by its ID",
        ...productParamsSchema,
        response: {
          200: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              data: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  articleNo: { type: "string" },
                  name: { type: "string" },
                  inPrice: { type: "number" },
                  price: { type: "number" },
                  unit: { type: "string" },
                  inStock: { type: "integer" },
                  description: { type: "string" },
                  createdAt: { type: "string", format: "date-time" },
                  updatedAt: { type: "string", format: "date-time" },
                },
              },
            },
          },
        },
      },
    },
    productController.getProductById
  );

  fastify.post(
    "/products",
    {
      schema: {
        tags: ["Products"],
        summary: "Create a single product",
        description: "Create a new product with unique article number",
        ...createProductSchema,
        response: {
          201: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
              data: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  articleNo: { type: "string" },
                  name: { type: "string" },
                  inPrice: { type: "number" },
                  price: { type: "number" },
                  unit: { type: "string" },
                  inStock: { type: "integer" },
                  description: { type: "string" },
                  createdAt: { type: "string", format: "date-time" },
                  updatedAt: { type: "string", format: "date-time" },
                },
              },
            },
          },
        },
      },
    },
    productController.createProduct
  );

  fastify.put(
    "/products/:id",
    {
      schema: {
        tags: ["Products"],
        summary: "Update a product",
        description: "Update an existing product by its ID",
        ...productParamsSchema,
        ...updateProductSchema,
        response: {
          200: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
              data: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  articleNo: { type: "string" },
                  name: { type: "string" },
                  inPrice: { type: "number" },
                  price: { type: "number" },
                  unit: { type: "string" },
                  inStock: { type: "integer" },
                  description: { type: "string" },
                  createdAt: { type: "string", format: "date-time" },
                  updatedAt: { type: "string", format: "date-time" },
                },
              },
            },
          },
        },
      },
    },
    productController.updateProduct
  );

  fastify.delete(
    "/products/:id",
    {
      schema: {
        tags: ["Products"],
        summary: "Delete a product",
        description: "Delete a product by its ID",
        ...productParamsSchema,
        response: {
          200: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
              data: {
                type: "object",
                properties: {
                  message: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    productController.deleteProduct
  );
}
