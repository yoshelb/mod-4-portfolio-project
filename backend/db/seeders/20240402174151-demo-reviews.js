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
      await Review.bulkCreate(
        [
          {
            spotId: spt1.id,
            userId: u5.id,
            review: "review for spot 1 user 5",
            stars: 2,
          },
          {
            spotId: spt2.id,
            userId: u5.id,
            review: "review for spot 2 user 5",
            stars: 4,
          },
          {
            spotId: spt3.id,
            userId: u5.id,
            review: "review for spot 3 user 5",
            stars: 1,
          },
          {
            spotId: spt4.id,
            userId: u5.id,
            review: "review for spot 4 user 5",
            stars: 3,
          },
          {
            spotId: spt5.id,
            userId: u5.id,
            review: "review for spot 5 user 5",
            stars: 5,
          },
          {
            spotId: spt6.id,
            userId: u5.id,
            review: "review for spot 6 user 5",
            stars: 2,
          },
          {
            spotId: spt7.id,
            userId: u5.id,
            review: "review for spot 7 user 5",
            stars: 2,
          },
          {
            spotId: spt8.id,
            userId: u5.id,
            review: "review for spot 8 user 5",
            stars: 2,
          },
          {
            spotId: spt9.id,
            userId: u5.id,
            review: "review for spot 9 user 5",
            stars: 2,
          },
          {
            spotId: spt1.id,
            userId: u4.id,
            review: "review for spot 1 user 4",
            stars: 3,
          },
          {
            spotId: spt2.id,
            userId: u4.id,
            review: "review for spot 2 user 4",
            stars: 5,
          },
          {
            spotId: spt3.id,
            userId: u4.id,
            review: "review for spot 3 user 4",
            stars: 5,
          },
          {
            spotId: spt4.id,
            userId: u4.id,
            review: "review for spot 4 user 4",
            stars: 5,
          },
          {
            spotId: spt5.id,
            userId: u4.id,
            review: "review for spot 5 user 4",
            stars: 5,
          },
          {
            spotId: spt5.id,
            userId: u4.id,
            review: "review for spot 5 user 4",
            stars: 3,
          },
          {
            spotId: spt6.id,
            userId: u4.id,
            review: "review for spot 6 user 4",
            stars: 1,
          },
          {
            spotId: spt7.id,
            userId: u4.id,
            review: "review for spot 7 user 4",
            stars: 5,
          },
          {
            spotId: spt1.id,
            userId: u3.id,
            review: "review for spot 1 user 3",
            stars: 5,
          },
          {
            spotId: spt2.id,
            userId: u3.id,
            review: "review for spot 2 user 3",
            stars: 5,
          },
          {
            spotId: spt3.id,
            userId: u3.id,
            review: "review for spot 3 user 3",
            stars: 5,
          },
          {
            spotId: spt4.id,
            userId: u3.id,
            review: "review for spot 4 user 3",
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
            "review for spot 1 user 5",
            "review for spot 2 user 5",
            "review for spot 3 user 5",
            "review for spot 4 user 5",
            "review for spot 5 user 5",
            "review for spot 6 user 5",
            "review for spot 7 user 5",
            "review for spot 8 user 5",
            "review for spot 9 user 5",
            "review for spot 1 user 4",
            "review for spot 2 user 4",
            "review for spot 3 user 4",
            "review for spot 4 user 4",
            "review for spot 5 user 4",
            "review for spot 5 user 4",
            "review for spot 6 user 4",
            "review for spot 7 user 4",
            "review for spot 1 user 3",
            "review for spot 2 user 3",
            "review for spot 3 user 3",
            "review for spot 4 user 3",
          ],
        },
      },
      {}
    );
  },
};
