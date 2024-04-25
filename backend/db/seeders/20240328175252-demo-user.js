"use strict";
const { User } = require("../models");

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await User.bulkCreate(
        [
          {
            email: "antenna@user.io",
            username: "AntennaExplorer",
            firstName: "Anthony",
            lastName: "Antennas",
            hashedPassword: bcrypt.hashSync("password1"),
          },
          {
            email: "mandible@user.io",
            username: "MightyMandible",
            firstName: "Mandy",
            lastName: "Mandible",
            hashedPassword: bcrypt.hashSync("password2"),
          },
          {
            email: "colony@user.io",
            username: "ColonyCommander",
            firstName: "Colin",
            lastName: "Colony",
            hashedPassword: bcrypt.hashSync("password3"),
          },
          {
            email: "sixlegs@user.io",
            username: "SixLegsRunning",
            firstName: "Johnny",
            lastName: "SixLegs",
            hashedPassword: bcrypt.hashSync("password4"),
          },
          {
            email: "honeydew@user.io",
            username: "HoneydewHarvester",
            firstName: "Holly",
            lastName: "Honeydew",
            hashedPassword: bcrypt.hashSync("password5"),
          },
        ],
        { validate: true }
      );
    } catch (e) {
      console.log("users-seed error", e);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        email: {
          [Op.in]: [
            "antenna@user.io",
            "mandible@user.io",
            "colony@user.io",
            "sixlegs@user.io",
            "honeydew@user.io",
          ],
        },
      },
      {}
    );
  },
};
