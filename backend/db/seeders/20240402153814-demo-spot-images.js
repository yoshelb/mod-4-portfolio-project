"use strict";
const { Spot, SpotImage } = require("../models");

//
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const spt1 = await Spot.findOne({
        where: { address: "123 Disney Lane" },
      });
      const spt2 = await Spot.findOne({
        where: { address: "405 Davis Ct" },
      });
      const spt3 = await Spot.findOne({
        where: { address: "55 Anchor Dr." },
      });
      await SpotImage.bulkCreate(
        [
          {
            spotId: spt1.id,
            url: "https://example.com/image1.jpg",
            preview: true,
          },
          {
            spotId: spt2.id,
            url: "https://example.com/image2.jpg",
            preview: true,
          },
          {
            spotId: spt3.id,
            url: "https://example.com/image3.jpg",
            preview: true,
          },
          {
            spotId: spt1.id,
            url: "https://example.com/image4.jpg",
            preview: false,
          },
          {
            spotId: spt2.id,
            url: "https://example.com/image5.jpg",
            preview: false,
          },
        ],
        { validate: true }
      );
    } catch (e) {
      console.log("spot-images-seed-error", e);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        url: {
          [Op.in]: [
            "https://example.com/image1.jpg",
            "https://example.com/image2.jpg",
            "https://example.com/image3.jpg",
            "https://example.com/image4.jpg",
            "https://example.com/image5.jpg",
          ],
        },
      },
      {}
    );
  },
};
