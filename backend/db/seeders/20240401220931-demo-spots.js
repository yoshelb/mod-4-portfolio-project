"use strict";

const { Spot, User } = require("../models");
//
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const u1 = await User.findOne({ where: { email: "antenna@user.io" } });
      const u2 = await User.findOne({ where: { email: "mandible@user.io" } });
      const u3 = await User.findOne({ where: { email: "colony@user.io" } });
      const u4 = await User.findOne({ where: { email: "sixlegs@user.io" } });
      await Spot.bulkCreate(
        [
          {
            ownerId: u1.id,
            address: "1 Barkwood Court",
            city: "Tinytown",
            state: "Leafyville",
            country: "Antland",
            lat: 34.052235,
            lng: -118.243683,
            name: "The Great Oak Condo",
            description:
              "A luxurious tree trunk apartment with a great view of the park.",
            price: 10,
          },
          {
            ownerId: u1.id,
            address: "2 Crumb Avenue",
            city: "Crumbville",
            state: "Bread State",
            country: "Antland",
            lat: 40.712776,
            lng: -74.005974,
            name: "Sandwich Manor",
            description:
              "Spacious living inside a gourmet sandwich left over from a picnic.",
            price: 15,
          },
          {
            ownerId: u1.id,
            address: "3 Chocolate Drive",
            city: "Candy City",
            state: "Sweet State",
            country: "Antland",
            lat: 37.774929,
            lng: -122.419418,
            name: "Candy Bar Castle",
            description:
              "A sweet escape in a half-eaten candy bar with all the amenities.",
            price: 20,
          },
          {
            ownerId: u2.id,
            address: "4 Pebble Path",
            city: "Rockville",
            state: "Granite State",
            country: "Antland",
            lat: 34.052235,
            lng: -118.243683,
            name: "Granite Towers",
            description:
              "An exclusive pebble-strewn property perfect for ant royalty.",
            price: 12,
          },
          {
            ownerId: u2.id,
            address: "5 Dewdrop Blvd",
            city: "Morning Dew",
            state: "Fresh State",
            country: "Antland",
            lat: 40.712776,
            lng: -74.005974,
            name: "Dewdrop Inn",
            description:
              "Stay moist in this luxurious spot nestled in morning dew grass.",
            price: 8,
          },
          {
            ownerId: u2.id,
            address: "6 Underground Way",
            city: "Soil City",
            state: "Earth State",
            country: "Antland",
            lat: 37.774929,
            lng: -122.419418,
            name: "The Subterranean Suite",
            description:
              "A classic ant hill, revamped into a modern underground getaway.",
            price: 5,
          },
          {
            ownerId: u3.id,
            address: "7 Trashcan Road",
            city: "Garbageville",
            state: "Waste State",
            country: "Antland",
            lat: 34.052235,
            lng: -118.243683,
            name: "Recycle Bin Retreat",
            description:
              "An eco-friendly spot located in a recycled trash can.",
            price: 9,
          },
          {
            ownerId: u3.id,
            address: "8 Silk Street",
            city: "Webtown",
            state: "Spider State",
            country: "Antland",
            lat: 40.712776,
            lng: -74.005974,
            name: "Silk Road Residence",
            description:
              "A secure spot wrapped in silk, courtesy of our spider neighbors.",
            price: 18,
          },
          {
            ownerId: u4.id,
            address: "9 Leaf Lane",
            city: "Foliage Fort",
            state: "Green State",
            country: "Antland",
            lat: 37.774929,
            lng: -122.419418,
            name: "Leaf Loft",
            description:
              "A leafy loft that blends in perfectly with the forest floor.",
            price: 7,
          },
        ],
        { validate: true }
      );
    } catch (e) {
      console.log("spots-seed-error", e);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        address: {
          [Op.in]: [
            "7 Trashcan Road",
            "8 Silk Street",
            "9 Leaf Lane",
            "6 Underground Way",
            "5 Dewdrop Blvd",
            "4 Pebble Path",
            "3 Chocolate Drive",
            "2 Crumb Avenue",
            "1 Barkwood Court",
          ],
        },
      },
      {}
    );
  },
};
