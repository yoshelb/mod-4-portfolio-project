"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Reviews",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        spotId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Spots",
            key: "id",
          },
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id",
          },
        },
        review: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        stars: {
          type: Sequelize.INTEGER,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    await queryInterface.dropTable(options);
  },
};
