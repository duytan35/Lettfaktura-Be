export const productSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    articleNo: { type: "string" },
    name: { type: "string" },
    inPrice: { type: "number", minimum: 0 },
    price: { type: "number", minimum: 0 },
    unit: { type: "string" },
    inStock: { type: "integer", minimum: 0 },
    description: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
};

const singleProductSchema = {
  type: "object",
  required: ["articleNo", "name"],
  properties: {
    articleNo: { type: "string", minLength: 1, maxLength: 50 },
    name: { type: "string", minLength: 1, maxLength: 255 },
    inPrice: { type: "number", minimum: 0 },
    price: { type: "number", minimum: 0 },
    unit: { type: "string", minLength: 1, maxLength: 20 },
    inStock: { type: "integer", minimum: 0, default: 0 },
    description: { type: "string", maxLength: 1000 },
  },
};

export const createBulkProductsSchema = {
  body: {
    type: "object",
    required: ["products"],
    properties: {
      products: {
        type: "array",
        minItems: 1,
        maxItems: 1000,
        items: singleProductSchema,
      },
    },
  },
};

export const createProductSchema = {
  body: singleProductSchema,
};

export const updateProductSchema = {
  body: {
    type: "object",
    properties: {
      articleNo: { type: "string", minLength: 1, maxLength: 50 },
      name: { type: "string", minLength: 1, maxLength: 255 },
      inPrice: { type: "number", minimum: 0 },
      price: { type: "number", minimum: 0 },
      unit: { type: "string", minLength: 1, maxLength: 20 },
      inStock: { type: "integer", minimum: 0 },
      description: { type: "string", maxLength: 1000 },
    },
    minProperties: 1,
  },
};

export const productParamsSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer", minimum: 1 },
    },
  },
};
