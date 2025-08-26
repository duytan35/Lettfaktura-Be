import Product from "./product.model.js";
import { ConflictError, NotFoundError } from "../../common/errors.js";
import { getPagination } from "../../common/utils.js";
import { Op } from "sequelize";

export default class ProductService {
  async getAllProducts(query = {}) {
    const { page, limit, articleNo, name } = query;

    // Build where clause for search
    const whereClause = {};

    if (articleNo) {
      whereClause.articleNo = {
        [Op.iLike]: `%${articleNo}%`,
      };
    }

    if (name) {
      whereClause.name = {
        [Op.iLike]: `%${name}%`,
      };
    }

    // If pagination parameters are provided, use pagination
    if (page !== undefined && limit !== undefined) {
      const { limit: take, offset: skip } = getPagination(page, limit);

      const { count, rows } = await Product.findAndCountAll({
        where: whereClause,
        limit: take,
        offset: skip,
        order: [["createdAt", "DESC"]],
      });

      return { products: rows, total: count, paginated: true };
    }

    // Otherwise return all products
    const products = await Product.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    return { products, total: products.length, paginated: false };
  }

  async createBulkProducts(productsData) {
    // Extract all article numbers from the request
    const articleNumbers = productsData.map((product) => product.articleNo);

    // Check for duplicates within the request
    const duplicatesInRequest = articleNumbers.filter(
      (item, index) => articleNumbers.indexOf(item) !== index
    );

    if (duplicatesInRequest.length > 0) {
      throw new ConflictError(
        `Duplicate article numbers in request: ${duplicatesInRequest.join(", ")}`
      );
    }

    // Check for existing products in database
    const existingProducts = await Product.findAll({
      where: {
        articleNo: articleNumbers,
      },
      attributes: ["articleNo"],
    });

    if (existingProducts.length > 0) {
      const existingArticleNos = existingProducts.map((p) => p.articleNo);
      throw new ConflictError(
        `Products with these article numbers already exist: ${existingArticleNos.join(", ")}`
      );
    }

    // Create all products
    const createdProducts = await Product.bulkCreate(productsData, {
      returning: true,
      validate: true,
    });

    return createdProducts;
  }

  async getProductById(id) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }
    return product;
  }

  async createProduct(productData) {
    const existingProduct = await Product.findOne({
      where: { articleNo: productData.articleNo },
    });

    if (existingProduct) {
      throw new ConflictError(
        `Product with article number ${productData.articleNo} already exists`
      );
    }

    const product = await Product.create(productData);
    return product;
  }

  async updateProduct(id, productData) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }

    if (productData.articleNo && productData.articleNo !== product.articleNo) {
      const existingProduct = await Product.findOne({
        where: { 
          articleNo: productData.articleNo,
          id: { [Op.ne]: id }
        },
      });

      if (existingProduct) {
        throw new ConflictError(
          `Product with article number ${productData.articleNo} already exists`
        );
      }
    }

    await product.update(productData);
    return product;
  }

  async deleteProduct(id) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }

    await product.destroy();
    return { message: "Product deleted successfully" };
  }
}
