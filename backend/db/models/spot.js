"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // associates spot to owner
      Spot.belongsTo(models.User, { as: "Owner", foreignKey: "ownerId" });
      // spot to spotImages
      Spot.hasMany(models.SpotImage, { foreignKey: "spotId" });

      Spot.hasMany(models.Review, { foreignKey: "spotId" });

      //direct to booking
      Spot.hasMany(models.Booking, { foreignKey: "spotId" });
    }
  }
  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      lat: {
        type: DataTypes.DECIMAL,
        validate: {
          min: -90,
          max: 90,
        },
      },
      lng: {
        type: DataTypes.DECIMAL,
        validate: {
          min: -180,
          max: 180,
        },
      },
      name: {
        type: DataTypes.STRING(50),
        validate: {
          len: [1, 50],
        },
      },
      description: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        validate: {
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
