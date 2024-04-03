"use strict";
const { Booking } = require("../models");

//
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Booking.bulkCreate(
        [
          {
            id: 1,
            spotId: 1,
            userId: 1,
            startDate: "2024-08-02",
            endDate: "2024-08-06",
          },
          {
            id: 2,
            spotId: 2,
            userId: 2,
            startDate: "2024-08-02",
            endDate: "2024-08-06",
          },
          {
            id: 3,
            spotId: 3,
            userId: 3,
            startDate: "2024-08-02",
            endDate: "2024-08-06",
          },
        ],
        { validate: true }
      );
    } catch (e) {
      console.log("Bookings seed error: ", e);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        [Op.and]: [
          {
            id: 1,
            spotId: 1,
            userId: 1,
          },
          {
            id: 2,
            spotId: 2,
            userId: 2,
          },
          {
            id: 3,
            spotId: 3,
            userId: 3,
          },
        ],
      },
      {}
    );
  },
};
