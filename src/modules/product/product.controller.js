import ProductService from "./product.service.js";
import { createResponse, getPaginationMeta } from "../../common/utils.js";

export default class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  getAllProducts = async (request, reply) => {
    const { products, total, paginated } =
      await this.productService.getAllProducts(request.query);

    const responseData = {
      products,
    };

    // Add pagination meta if paginated
    if (paginated) {
      const { page = 1, limit = 10 } = request.query;
      responseData.meta = getPaginationMeta(page, limit, total);
    }

    reply.send(createResponse(true, responseData));
  };

  createBulkProducts = async (request, reply) => {
    const products = await this.productService.createBulkProducts(
      request.body.products
    );

    reply
      .status(201)
      .send(
        createResponse(
          true,
          products,
          `${products.length} products created successfully`
        )
      );
  };

  getProductById = async (request, reply) => {
    const { id } = request.params;
    const product = await this.productService.getProductById(id);

    reply.send(createResponse(true, product));
  };

  createProduct = async (request, reply) => {
    const product = await this.productService.createProduct(request.body);

    reply
      .status(201)
      .send(createResponse(true, product, "Product created successfully"));
  };

  updateProduct = async (request, reply) => {
    const { id } = request.params;
    const product = await this.productService.updateProduct(id, request.body);

    reply.send(createResponse(true, product, "Product updated successfully"));
  };

  deleteProduct = async (request, reply) => {
    const { id } = request.params;
    const result = await this.productService.deleteProduct(id);

    reply.send(createResponse(true, result, result.message));
  };
}
