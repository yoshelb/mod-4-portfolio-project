"use strict";
const { Review } = require("../models");

//
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Review.bulkCreate(
        [
          {
            spotId: 1,
            userId: 1,
            review: "review for spot 1 user 1",
            stars: 2,
          },
          {
            spotId: 1,
            userId: 2,
            review: "review for spot 1 user 2",
            stars: 4,
          },
          {
            spotId: 1,
            userId: 3,
            review: "review for spot 1 user 3",
            stars: 5,
          },
        ],
        { validate: true }
      );
    } catch (e) {
      console.log("reviews seed error: ", e);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        review: {
          [Op.in]: [
            "review for spot 1 user 1",
            "review for spot 1 user 2",
            "review for spot 1 user 3",
          ],
        },
      },
      {}
    );
  },
};
