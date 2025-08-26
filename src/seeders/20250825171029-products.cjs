"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [];

    // Generate more sample products
    for (let i = 1; i <= 50; i++) {
      products.push({
        articleNo: `BULK${i.toString().padStart(3, "0")}`,
        name: `Bulk Product ${i}`,
        inPrice: Math.round((Math.random() * 100 + 10) * 100) / 100,
        price: Math.round((Math.random() * 150 + 50) * 100) / 100,
        unit: ["pcs", "kg", "liter", "box", "pack"][
          Math.floor(Math.random() * 5)
        ],
        inStock: Math.floor(Math.random() * 200),
        description: `Description for bulk product ${i} - automatically generated`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("products", products);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", {
      articleNo: {
        [Sequelize.Op.like]: "BULK%",
      },
    });
  },
};
