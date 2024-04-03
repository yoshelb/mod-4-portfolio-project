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
            id: 1,
            spotId: 1,
            url: "https://example.com/image1.jpg",
            preview: true,
          },
          {
            id: 2,
            spotId: 2,
            url: "https://example.com/image2.jpg",
            preview: true,
          },
          {
            id: 3,
            spotId: 3,
            url: "https://example.com/image3.jpg",
            preview: true,
          },
          {
            id: 4,
            spotId: 1,
            url: "https://example.com/image4.jpg",
            preview: false,
          },
          {
            id: 5,
            spotId: 1,
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
