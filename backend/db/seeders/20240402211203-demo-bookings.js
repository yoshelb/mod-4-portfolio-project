"use strict";
const { Booking, User, Spot } = require("../models");

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
      await Booking.bulkCreate(
        [
          {
            spotId: spt1.id,
            userId: u4.id,
            startDate: "2024-08-02",
            endDate: "2024-08-06",
          },
          {
            spotId: spt2.id,
            userId: u3.id,
            startDate: "2024-08-02",
            endDate: "2024-08-06",
          },
          {
            spotId: spt3.id,
            userId: u5.id,
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
    return queryInterface.bulkDelete(
      options,
      {
        [Op.and]: [
          {
            spotId: spt1.id,
            userId: u4.id,
          },
          {
            spotId: spt2.id,
            userId: u3.id,
          },
          {
            spotId: spt3.id,
            userId: u5.id,
          },
        ],
      },
      {}
    );
  },
};
