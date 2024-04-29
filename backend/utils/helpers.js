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
        attributes: ["stars"],
      },
      {
        model: SpotImage,
        attributes: ["url"],
        where: { preview: true },
      },
    ],
  });

  let newBody = [];
  spots.forEach((spot) => {
    let previewImage = null;
    if (spot.SpotImages.length > 0) {
      previewImage = spot.SpotImages[0].dataValues.url;
    }

    const numReviews = spot.dataValues.Reviews.length;
    let avgRating;
    if (numReviews <= 0) {
      avgRating = "New";
    } else {
      avgRating =
        spot.dataValues.Reviews.reduce((acc, obj) => {
          acc += obj.stars;
          return acc;
        }, 0) / numReviews;
      avgRating = avgRating.toFixed(2);
    }
    let fortmattedPrice;
    if (spot.price) {
      const priceArr = spot.price.toString().split(".");
      if (priceArr[1] && priceArr[1].length == 1) {
        fortmattedPrice = `${priceArr[0]}.${priceArr[1]}0`;
      } else {
        fortmattedPrice = spot.price;
      }
    }

    const spotWithExtraData = {
      ...spot.dataValues,
      previewImage: previewImage,
      avgRating: avgRating,
      price: fortmattedPrice,
    };
    delete spotWithExtraData.Reviews;
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
  try {
    const spots = await Spot.findAll({
      limit: limit,
      offset: offset,
      where: whereObj,
      include: [
        {
          model: Review,
          attributes: ["stars"],
        },
        {
          model: SpotImage,
          attributes: ["url"],
          where: { preview: true },
        },
      ],
    });

    if (spots.length === 0) {
      return [];
    }
    let newBody = [];

    spots.forEach((spot) => {
      let previewImage = null;
      if (spot.SpotImages.length > 0) {
        previewImage = spot.SpotImages[0].dataValues.url;
      }

      const numReviews = spot.dataValues.Reviews.length;
      let avgRating;
      if (numReviews <= 0) {
        avgRating = "New";
      } else {
        avgRating =
          spot.dataValues.Reviews.reduce((acc, obj) => {
            acc += obj.stars;
            return acc;
          }, 0) / numReviews;
        avgRating = avgRating.toFixed(2);
      }

      let fortmattedPrice;
      if (spot.price) {
        const priceArr = spot.price.toString().split(".");
        if (priceArr[1] && priceArr[1].length == 1) {
          fortmattedPrice = `${priceArr[0]}.${priceArr[1]}0`;
        } else {
          fortmattedPrice = spot.price;
        }
      }

      const spotWithExtraData = {
        ...spot.dataValues,
        previewImage: previewImage,
        avgRating: avgRating,
        price: fortmattedPrice,
      };
      delete spotWithExtraData.Reviews;
      delete spotWithExtraData.SpotImages;
      const formattedBody = formatSpotResponse(spotWithExtraData);

      newBody.push(formattedBody);
    });

    return newBody;
  } catch (error) {
    console.error("Error fetching spots:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

function formatSpotResponse(spot) {
  spot.lat = parseFloat(spot.lat);
  spot.lng = parseFloat(spot.lng);

  spot.createdAt = formatDate(spot.createdAt);

  spot.updatedAt = formatDate(spot.updatedAt);

  if (typeof spot.avgRating === "string" && spot.avgRating !== "New") {
    spot.avgRating = parseFloat(spot.avgRating).toFixed(2);
  }
  return spot;
}

function formatStartAndEndDate(dateString) {
  return dateString
    .toISOString()
    .split("T")
    .join(" ")
    .split("Z")
    .join(" ")
    .split(".")
    .slice(0, -1)
    .join(" ")
    .split(" ")
    .slice(0, -1)
    .join();
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
  formatStartAndEndDate,
};
