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
            id: 1,
            email: "demo@user.io",
            username: "Demo-lition",
            hashedPassword: bcrypt.hashSync("password"),
          },
          {
            id: 2,
            email: "user1@user.io",
            username: "FakeUser1",
            hashedPassword: bcrypt.hashSync("password2"),
          },
          {
            id: 3,
            email: "user2@user.io",
            username: "FakeUser2",
            hashedPassword: bcrypt.hashSync("password3"),
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
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
