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
        where: { address: "1 Barkwood Court" },
      });
      const spt2 = await Spot.findOne({
        where: { address: "3 Chocolate Drive" },
      });
      const spt3 = await Spot.findOne({
        where: { address: "2 Crumb Avenue" },
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

      await SpotImage.bulkCreate(
        [
          {
            spotId: spt1.id,
            url: "./images/spot-seed-images/stump-bnb.png",
            preview: true,
          },
          {
            spotId: spt2.id,
            url: "./images/spot-seed-images/candy-bnb.png",
            preview: true,
          },
          {
            spotId: spt3.id,
            url: "./images/spot-seed-images/sandwhich-bnb.png",
            preview: true,
          },
          {
            spotId: spt4.id,
            url: "./images/spot-seed-images/pebble-bnb.png",
            preview: true,
          },
          {
            spotId: spt5.id,
            url: "./images/spot-seed-images/dewdrop-bnb.png",
            preview: true,
          },
          {
            spotId: spt6.id,
            url: "./images/spot-seed-images/underground-bnb.png",
            preview: true,
          },
          {
            spotId: spt7.id,
            url: "./images/spot-seed-images/garbage-bnb.png",
            preview: true,
          },
          {
            spotId: spt8.id,
            url: "./images/spot-seed-images/sandwhich-bnb.png",
            preview: true,
          },
          {
            spotId: spt9.id,
            url: "./images/spot-seed-images/sandwhich-bnb.png",
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
            "./images/spot-seed-images/stump-bnb.png",
            "./images/spot-seed-images/candy-bnb.png",
            "./images/spot-seed-images/sandwhich-bnb.png",
            "./images/spot-seed-images/pebble-bnb.png",
            "./images/spot-seed-images/dewdrop-bnb.png",
            "./images/spot-seed-images/garbage-bnb.png",
          ],
        },
      },
      {}
    );
  },
};
