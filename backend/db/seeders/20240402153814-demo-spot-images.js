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
            url: "/images/spot-seed-images/stump-bnb.png",
            preview: true,
          },
          {
            spotId: spt1.id,
            url: "/images/spot-seed-images/stump-bnb-images/1.png",
            preview: false,
          },
          {
            spotId: spt1.id,
            url: "/images/spot-seed-images/stump-bnb-images/2.png",
            preview: false,
          },
          {
            spotId: spt1.id,
            url: "/images/spot-seed-images/stump-bnb-images/3.png",
            preview: false,
          },
          {
            spotId: spt1.id,
            url: "/images/spot-seed-images/stump-bnb-images/4.png",
            preview: false,
          },
          // SPOT 2 IMG
          {
            spotId: spt2.id,
            url: "/images/spot-seed-images/candy-bnb.png",
            preview: true,
          },
          {
            spotId: spt2.id,
            url: "/images/spot-seed-images/candy-bnb-images/9.png",
            preview: false,
          },
          {
            spotId: spt2.id,
            url: "/images/spot-seed-images/candy-bnb-images/10.png",
            preview: false,
          },
          {
            spotId: spt2.id,
            url: "/images/spot-seed-images/candy-bnb-images/11.png",
            preview: false,
          },
          {
            spotId: spt2.id,
            url: "/images/spot-seed-images/candy-bnb-images/12.png",
            preview: false,
          },
          // SPOT 3 IMG
          {
            spotId: spt3.id,
            url: "/images/spot-seed-images/sandwhich-bnb.png",
            preview: true,
          },
          {
            spotId: spt3.id,
            url: "/images/spot-seed-images/sandwhich-bnb-images/5.png",
            preview: false,
          },
          {
            spotId: spt3.id,
            url: "/images/spot-seed-images/sandwhich-bnb-images/6.png",
            preview: false,
          },
          {
            spotId: spt3.id,
            url: "/images/spot-seed-images/sandwhich-bnb-images/7.png",
            preview: false,
          },
          {
            spotId: spt3.id,
            url: "/images/spot-seed-images/sandwhich-bnb-images/8.png",
            preview: false,
          },
          // SPOT 4
          {
            spotId: spt4.id,
            url: "/images/spot-seed-images/pebble-bnb.png",
            preview: true,
          },
          {
            spotId: spt4.id,
            url: "/images/spot-seed-images/pebble-bnb-images/13.png",
            preview: false,
          },
          {
            spotId: spt4.id,
            url: "/images/spot-seed-images/pebble-bnb-images/14.png",
            preview: false,
          },
          {
            spotId: spt4.id,
            url: "/images/spot-seed-images/pebble-bnb-images/15.png",
            preview: false,
          },
          {
            spotId: spt4.id,
            url: "/images/spot-seed-images/pebble-bnb-images/16.png",
            preview: false,
          },
          // spot 5
          {
            spotId: spt5.id,
            url: "/images/spot-seed-images/dewdrop-bnb.png",
            preview: true,
          },
          {
            spotId: spt5.id,
            url: "/images/spot-seed-images/dewdrop-bnb-images/17.png",
            preview: false,
          },
          {
            spotId: spt5.id,
            url: "/images/spot-seed-images/dewdrop-bnb-images/18.png",
            preview: false,
          },
          {
            spotId: spt5.id,
            url: "/images/spot-seed-images/dewdrop-bnb-images/19.png",
            preview: false,
          },
          {
            spotId: spt5.id,
            url: "/images/spot-seed-images/dewdrop-bnb-images/20.png",
            preview: false,
          },
          // SPOT 6
          {
            spotId: spt6.id,
            url: "/images/spot-seed-images/underground-bnb.png",
            preview: true,
          },
          {
            spotId: spt6.id,
            url: "/images/spot-seed-images/underground-bnb-images/21.png",
            preview: false,
          },
          {
            spotId: spt6.id,
            url: "/images/spot-seed-images/underground-bnb-images/22.png",
            preview: false,
          },
          {
            spotId: spt6.id,
            url: "/images/spot-seed-images/underground-bnb-images/23.png",
            preview: false,
          },
          {
            spotId: spt6.id,
            url: "/images/spot-seed-images/underground-bnb-images/24.png",
            preview: false,
          },
          // SPOT 7
          {
            spotId: spt7.id,
            url: "/images/spot-seed-images/garbage-bnb.png",
            preview: true,
          },
          {
            spotId: spt7.id,
            url: "/images/spot-seed-images/garbage-bnb-images/25.png",
            preview: false,
          },
          {
            spotId: spt7.id,
            url: "/images/spot-seed-images/garbage-bnb-images/26.png",
            preview: false,
          },
          {
            spotId: spt7.id,
            url: "/images/spot-seed-images/garbage-bnb-images/27.png",
            preview: false,
          },
          {
            spotId: spt7.id,
            url: "/images/spot-seed-images/garbage-bnb-images/28.png",
            preview: false,
          },
          // SPOT 8
          {
            spotId: spt8.id,
            url: "/images/spot-seed-images/web-bnb.png",
            preview: true,
          },
          {
            spotId: spt8.id,
            url: "/images/spot-seed-images/web-bnb-images/33.png",
            preview: false,
          },
          {
            spotId: spt8.id,
            url: "/images/spot-seed-images/web-bnb-images/34.png",
            preview: false,
          },
          {
            spotId: spt8.id,
            url: "/images/spot-seed-images/web-bnb-images/35.png",
            preview: false,
          },
          {
            spotId: spt8.id,
            url: "/images/spot-seed-images/web-bnb-images/36.png",
            preview: false,
          },
          // SPOT 9
          {
            spotId: spt9.id,
            url: "/images/spot-seed-images/leaf-bnb.png",
            preview: true,
          },
          {
            spotId: spt9.id,
            url: "/images/spot-seed-images/leaf-bnb-images/29.png",
            preview: false,
          },
          {
            spotId: spt9.id,
            url: "/images/spot-seed-images/leaf-bnb-images/30.png",
            preview: false,
          },
          {
            spotId: spt9.id,
            url: "/images/spot-seed-images/leaf-bnb-images/31.png",
            preview: false,
          },
          {
            spotId: spt9.id,
            url: "/images/spot-seed-images/leaf-bnb-images/32.png",
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
            "/images/spot-seed-images/stump-bnb.png",
            "/images/spot-seed-images/candy-bnb.png",
            "/images/spot-seed-images/sandwhich-bnb.png",
            "/images/spot-seed-images/pebble-bnb.png",
            "/images/spot-seed-images/dewdrop-bnb.png",
            "/images/spot-seed-images/garbage-bnb.png",
            "/images/spot-seed-images/leaf-bnb-images/29.png",
            "/images/spot-seed-images/leaf-bnb-images/30.png",
            "/images/spot-seed-images/leaf-bnb-images/31.png",
            "/images/spot-seed-images/leaf-bnb-images/32.png",
            "/images/spot-seed-images/web-bnb.png",
            "/images/spot-seed-images/leaf-bnb.png",
            "/images/spot-seed-images/stump-bnb-images/1.png",
            "/images/spot-seed-images/stump-bnb-images/2.png",
            "/images/spot-seed-images/stump-bnb-images/3.png",
            "/images/spot-seed-images/stump-bnb-images/4.png",
            "/images/spot-seed-images/candy-bnb-images/9.png",
            "/images/spot-seed-images/candy-bnb-images/10.png",
            "/images/spot-seed-images/candy-bnb-images/11.png",
            "/images/spot-seed-images/candy-bnb-images/12.png",
            "/images/spot-seed-images/sandwhich-bnb-images/5.png",
            "/images/spot-seed-images/sandwhich-bnb-images/6.png",
            "/images/spot-seed-images/sandwhich-bnb-images/7.png",
            "/images/spot-seed-images/sandwhich-bnb-images/8.png",
            "/images/spot-seed-images/pebble-bnb-images/13.png",
            "/images/spot-seed-images/pebble-bnb-images/14.png",
            "/images/spot-seed-images/pebble-bnb-images/15.png",
            "/images/spot-seed-images/pebble-bnb-images/16.png",
            "/images/spot-seed-images/dewdrop-bnb-images/17.png",
            "/images/spot-seed-images/dewdrop-bnb-images/18.png",
            "/images/spot-seed-images/dewdrop-bnb-images/19.png",
            "/images/spot-seed-images/dewdrop-bnb-images/20.png",
            "/images/spot-seed-images/underground-bnb-images/21.png",
            "/images/spot-seed-images/underground-bnb-images/22.png",
            "/images/spot-seed-images/underground-bnb-images/23.png",
            "/images/spot-seed-images/underground-bnb-images/24.png",
            "/images/spot-seed-images/garbage-bnb-images/25.png",
            "/images/spot-seed-images/garbage-bnb-images/26.png",
            "/images/spot-seed-images/garbage-bnb-images/27.png",
            "/images/spot-seed-images/garbage-bnb-images/28.png",
            "/images/spot-seed-images/web-bnb-images/33.png",
            "/images/spot-seed-images/web-bnb-images/34.png",
            "/images/spot-seed-images/web-bnb-images/35.png",
            "/images/spot-seed-images/web-bnb-images/36.png",
          ],
        },
      },
      {}
    );
  },
};
