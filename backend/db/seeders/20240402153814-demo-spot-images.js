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
      await SpotImage.bulkCreate(
        [
          {
            spotId: 2,
            url: "https://example.com/image1.jpg",
            preview: true,
          },
          {
            spotId: 2,
            url: "https://example.com/image2.jpg",
            preview: true,
          },
          {
            spotId: 2,
            url: "https://example.com/image3.jpg",
            preview: true,
          },
          {
            spotId: 1,
            url: "https://example.com/image4.jpg",
            preview: true,
          },
          {
            spotId: 1,
            url: "https://example.com/image5.jpg",
            preview: true,
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
