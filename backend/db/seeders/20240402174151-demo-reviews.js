"use strict";
const { Review, User, Spot } = require("../models");

//
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const u1 = await User.findOne({ where: { email: "demo@user.io" } });
      const u2 = await User.findOne({ where: { email: "user1@user.io" } });
      const u3 = await User.findOne({ where: { email: "user2@user.io" } });

      const spt1 = await Spot.findOne({
        where: { address: "123 Disney Lane" },
      });
      const spt2 = await Spot.findOne({
        where: { address: "405 Davis Ct" },
      });
      const spt3 = await Spot.findOne({
        where: { address: "55 Anchor Dr." },
      });
      await Review.bulkCreate(
        [
          {
            spotId: spt1.id,
            userId: u2.id,
            review: "review for spot 1 user 1",
            stars: 2,
          },
          {
            spotId: spt2.id,
            userId: u3.id,
            review: "review for spot 1 user 2",
            stars: 4,
          },
          {
            spotId: spt3.id,
            userId: u1.id,
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
