"use strict";
const { ReviewImage, Review, User, Spot } = require("../models");

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
      const r1 = await Review.findOne({
        where: { spotId: spt1.id, userId: u2.id },
      });
      const r2 = await Review.findOne({
        where: { spotId: spt2.id, userId: u3.id },
      });
      const r3 = await Review.findOne({
        where: { spotId: spt3.id, userId: u1.id },
      });
      await ReviewImage.bulkCreate(
        [
          {
            reviewId: r1.id,
            url: "https://example.com/image1.jpg",
          },
          {
            reviewId: r2.id,
            url: "https://example.com/image2.jpg",
          },
          {
            reviewId: r3.id,
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
