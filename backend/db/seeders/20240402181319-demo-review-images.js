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
      const u5 = await User.findOne({ where: { email: "honeydew@user.io" } });
      const u4 = await User.findOne({ where: { email: "sixlegs@user.io" } });
      const u3 = await User.findOne({ where: { email: "colony@user.io" } });

      const spt1 = await Spot.findOne({
        where: { address: "1 Barkwood Court" },
      });
      const spt2 = await Spot.findOne({
        where: { address: "2 Crumb Avenue" },
      });
      const spt3 = await Spot.findOne({
        where: { address: "3 Chocolate Drive" },
      });
      const spt4 = await Spot.findOne({
        where: { address: "4 Pebble Path" },
      });
      const spt5 = await Spot.findOne({
        where: { address: "5 Dewdrop Blvd" },
      });
      const spt6 = await Spot.findOne({
        where: { address: "6 Underground Way" },
      });
      const spt7 = await Spot.findOne({
        where: { address: "7 Trashcan Road" },
      });
      const spt8 = await Spot.findOne({
        where: { address: "8 Silk Street" },
      });
      const spt9 = await Spot.findOne({
        where: { address: "9 Leaf Lane" },
      });

      const r1 = await Review.findOne({
        where: { spotId: spt1.id, userId: u3.id },
      });
      const r2 = await Review.findOne({
        where: { spotId: spt2.id, userId: u4.id },
      });
      const r3 = await Review.findOne({
        where: { spotId: spt3.id, userId: u5.id },
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
