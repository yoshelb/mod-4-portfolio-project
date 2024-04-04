const {
  Spot,
  Booking,
  Review,
  ReviewImage,
  SpotImage,
  User,
  Sequelize,
} = require("../db/models");

const findAllSpots = async (whereObj = undefined) => {
  const spots = await Spot.findAll({
    ...whereObj,
    include: [
      {
        model: Review,
        attributes: [],
      },
      {
        model: SpotImage,
        attributes: ["url"],
        where: { preview: true },
        limit: 1,
      },
    ],
    attributes: {
      include: [
        [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgRating"],
      ],
      exclude: [],
    },
    group: ["Spot.id"],
  });

  let newBody = [];
  spots.forEach((spot) => {
    let previewImage;
    if (spot.SpotImages.length > 0) {
      previewImage = spot.SpotImages[0].dataValues.url;
    }

    spot.dataValues.avgRating = parseFloat(spot.dataValues.avgRating);

    if (typeof spot.dataValues.avgRating === "number") {
      spot.dataValues.avgRating = spot.dataValues.avgRating.toFixed(2);
    }

    const spotWithExtraData = {
      ...spot.dataValues,
      previewImage,
    };

    delete spotWithExtraData.SpotImages;

    newBody.push(spotWithExtraData);
  });
  return newBody;
};

module.exports = { findAllSpots };
