"use strict";
const { Spot } = require("../models");

//
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Spot.bulkCreate(
        [
          {
            id: 1,
            ownerId: 1,
            address: "123 Disney Lane",
            city: "San Francisco",
            state: "California",
            country: "United States of America",
            lat: 37.7645358,
            lng: -122.4730327,
            name: "App Academy",
            description: "Place where web developers are created",
            price: 123,
          },
          {
            id: 2,
            ownerId: 2,
            address: "405 Davis Ct",
            city: "San Francisco",
            state: "California",
            country: "United States of America",
            lat: 37.76673,
            lng: -122.433,
            name: "house",
            description: "it's a seed house",
            price: 10.27,
          },
          {
            id: 3,
            ownerId: 3,
            address: "55 Anchor Dr.",
            city: "San Francisco",
            state: "California",
            country: "United States of America",
            lat: 40.0,
            lng: -110.1,
            name: "Seed Place",
            description: "seeder place description",
            price: 150.34,
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
          [Op.in]: ["55 Anchor Dr.", "405 Davis Ct", "123 Disney Lane"],
        },
      },
      {}
    );
  },
};
