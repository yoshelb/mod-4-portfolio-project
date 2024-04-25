"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Spots",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        ownerId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id",
          },
          onDelete: "CASCADE",
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING(1000),
          allowNull: false,
        },
        city: {
          type: Sequelize.STRING(1000),
          allowNull: false,
        },
        state: {
          type: Sequelize.STRING(60),
          allowNull: false,
        },
        country: {
          type: Sequelize.STRING(60),
          allowNull: false,
        },
        lat: {
          type: Sequelize.DECIMAL,
        },
        lng: {
          type: Sequelize.DECIMAL,
        },
        name: {
          type: Sequelize.STRING(50),
        },
        description: {
          type: Sequelize.STRING(2000),
          allowNull: false,
        },
        price: {
          type: Sequelize.DECIMAL,
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
    options.tableName = "Spots";
    await queryInterface.dropTable(options);
  },
};
