"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Booking to Spot
      Booking.belongsTo(models.Spot, { foreignKey: "spotId" });

      // Booking to User
      Booking.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Booking.init(
    {
      spotId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Spots",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      startDate: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
          isAfter: {
            args: [new Date().toISOString().split("T")[0]],
            msg: "startDate cannot be in the past",
          },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
          isAfterStartDate(value) {
            if (value < this.startDate) {
              throw new Error("endDate cannot be on or before startDate");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Booking",
      scopes: {
        ownerOfSpot: {
          include: [
            {
              model: sequelize.models.User,
              attributes: {
                exclude: ["hashedPassword", "updatedAt", "email", "createdAt"],
              },
              where: {
                id: sequelize.col("Booking.userId"),
              },
            },
          ],
        },
        notOwnerOfSpot: {
          exclude: ["updatedAt", "createdAt", "userId"],
          include: ["spotId", "startDate", "endDate"],
        },
      },
    }
  );
  return Booking;
};
