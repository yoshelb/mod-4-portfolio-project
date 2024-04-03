"use strict";
const { ReviewImage } = require("../models");

//
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await ReviewImage.bulkCreate(
        [
          {
            id: 1,
            reviewId: 1,
            url: "https://example.com/image1.jpg",
          },
          {
            id: 2,
            reviewId: 2,
            url: "https://example.com/image2.jpg",
          },
          {
            id: 3,
            reviewId: 3,
            url: "https://example.com/image3.jpg",
          },
        ],
        { validate: true }
      );
    } catch (e) {
      console.log("Review Images seed error: ", e);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        url: {
          [Op.in]: [
            "https://example.com/image1.jpg",
            "https://example.com/image2.jpg",
            "https://example.com/image3.jpg",
          ],
        },
      },
      {}
    );
  },
};
