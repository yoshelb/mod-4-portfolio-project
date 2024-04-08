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
      await Booking.bulkCreate(
        [
          {
            spotId: spt1.id,
            userId: u2.id,
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
            userId: u1.id,
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
    return queryInterface.bulkDelete(
      options,
      {
        [Op.and]: [
          {
            spotId: spt1.id,
            userId: u2.id,
          },
          {
            spotId: spt2.id,
            userId: u3.id,
          },
          {
            spotId: spt3.id,
            userId: u1.id,
          },
        ],
      },
      {}
    );
  },
};
