"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "configs",
      [
        {
          languages: JSON.stringify([
            {
              id: 1,
              code: "svenska",
              name: "Svenska",
              icon: "https://storage.123fakturere.no/public/flags/SE.png",
              free_trial_days: 0,
              is_active: true,
              is_default: true,
              is_premium: false,
            },
            {
              id: 2,
              code: "english",
              name: "English",
              icon: "https://storage.123fakturere.no/public/flags/GB.png",
              free_trial_days: 0,
              is_active: true,
              is_default: true,
              is_premium: true,
            },
          ]),
          links: JSON.stringify({
            home: "https://www.123fakturera.se/index.html",
            orders: "https://www.123fakturera.se/bestall.html",
            our_customer: "https://www.123fakturera.se/kunder.html",
            about_us: "https://www.123fakturera.se/omoss.html",
            contact_us: "https://www.123fakturera.se/kontaktaoss.html",
          }),
          metadata: JSON.stringify({
            title: "123 Fakturera",
            description: "Sveriges enklaste fakturaprogram",
            favicon: "https://123fakturere.no/images/webclip.JPG",
          }),
          version: "sweden",
          image:
            "https://storage.123fakturera.se/public/wallpapers/sverige43.jpg",
          logo: "https://storage.123fakturera.se/public/icons/diamond.png",
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("configs", null, {});
  },
};
