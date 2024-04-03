"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //spotImage to spot
      SpotImage.belongsTo(models.Spot, { foreignKey: "spotId" });
    }
  }
  SpotImage.init(
    {
      spotId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Spots",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      preview: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "SpotImage",
      allowNull: false,
      indexes: [
        {
          unique: true,
          fields: ["spotId"],
          where: { preview: true },
        },
      ],
    }
  );
  return SpotImage;
};
