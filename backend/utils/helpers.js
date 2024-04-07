const {
  Spot,
  Booking,
  Review,
  ReviewImage,
  SpotImage,
  User,
  Sequelize,
} = require("../db/models");
const { Op } = require("sequelize");

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

    const spotWithExtraData = {
      ...spot.dataValues,
      previewImage,
    };

    delete spotWithExtraData.SpotImages;
    const formattedBody = formatSpotResponse(spotWithExtraData);

    newBody.push(formattedBody);
  });

  return newBody;
};

const findAllSpotsWithPagination = async (
  limit,
  offset,
  whereObj = undefined
) => {
  const spots = await Spot.findAll({
    ...limit,
    ...offset,
    ...whereObj,
    include: [
      {
        model: Review,
        attributes: ["stars"],
      },
      {
        model: SpotImage,
        attributes: ["url"],
        where: { preview: true },
        limit: 1,
      },
    ],
  });

  let newBody = [];

  spots.forEach((spot) => {
    let previewImage;
    if (spot.SpotImages.length > 0) {
      previewImage = spot.SpotImages[0].dataValues.url;
    }

    const numReviews = spot.dataValues.Reviews.length;

    const avgRating =
      spot.dataValues.Reviews.reduce((acc, obj) => {
        acc += obj.stars;
        return acc;
      }, 0) / numReviews;

    console.log(avgRating);

    const spotWithExtraData = {
      ...spot.dataValues,
      previewImage,
      avgRating,
    };
    delete spotWithExtraData.Reviews;
    delete spotWithExtraData.SpotImages;
    const formattedBody = formatSpotResponse(spotWithExtraData);

    newBody.push(formattedBody);
  });

  return newBody;
};

function formatSpotResponse(spot) {
  spot.price = parseFloat(spot.price);
  spot.lat = parseFloat(spot.lat);
  spot.lng = parseFloat(spot.lng);

  spot.createdAt = formatDate(spot.createdAt);

  spot.updatedAt = formatDate(spot.updatedAt);

  if (typeof spot.avgRating === "string") {
    spot.avgRating = parseFloat(spot.avgRating).toFixed(2);
  }
  return spot;
}

function formatDate(dateString) {
  return dateString
    .toISOString()
    .split("T")
    .join(" ")
    .split("Z")
    .join(" ")
    .split(".")
    .slice(0, -1)
    .join(" ");
}

module.exports = {
  findAllSpots,
  formatSpotResponse,
  formatDate,
  findAllSpotsWithPagination,
};
