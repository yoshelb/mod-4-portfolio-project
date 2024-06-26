const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");

const {
  Spot,
  Booking,
  Review,
  ReviewImage,
  SpotImage,
  User,
  Sequelize,
} = require("../../db/models");

const {
  findAllSpots,
  formatSpotResponse,
  formatDate,
  findAllSpotsWithPagination,
  formatStartAndEndDate,
} = require("../../utils/helpers");
const express = require("express");

const { check } = require("express-validator");
const {
  handleValidationErrors,
  validateCreateSpot,
  validateCreateReview,
  validateCreateBooking,
  validateQueries,
} = require("../../utils/validation");
const { Op } = require("sequelize");

const router = express.Router();

// GET current User spot-------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------
router.get("/current", requireAuth, async (req, res, next) => {
  const ownerId = req.user.id;

  const newBody = await findAllSpots({ where: { ownerId: ownerId } }); //helper func located in utils/helper
  res.json({ Spots: newBody });
});

// GET REVIEWS by Spot ID-------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------
router.get("/:spotId/reviews", async (req, res, next) => {
  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId);

  if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });

  const reviews = await Review.findAll({
    where: { spotId: spotId },
    include: [
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  const reviewsCopy = [...reviews];
  const resReviews = [];
  for (let review of reviewsCopy) {
    review = review.toJSON();
    review.createdAt = formatDate(review.createdAt);
    review.updatedAt = formatDate(review.updatedAt);
    resReviews.push(review);
  }

  res.json({ Reviews: resReviews });
});

// GET BOOKING BY SPOT ID _____________________-------------------------------------------
// ----------------------------------------------------------------------------------------------

router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const userId = req.user.id;

  const spot = await Spot.findByPk(spotId, {
    include: [
      {
        model: Booking,
        include: {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      },
    ],
    attributes: ["ownerId"],
  });

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  const bookingInfo = [];
  if (spot.dataValues.ownerId === userId) {
    const spotCopy = [...spot.dataValues.Bookings];
    for (let booking of spotCopy) {
      booking.dataValues.updatedAt = formatDate(booking.dataValues.updatedAt);
      booking.dataValues.createdAt = formatDate(booking.dataValues.createdAt);
      booking.dataValues.startDate = formatStartAndEndDate(
        booking.dataValues.startDate
      );
      booking.dataValues.endDate = formatStartAndEndDate(
        booking.dataValues.endDate
      );
    }
    bookingInfo.push(spotCopy);
  } else {
    const spotCopy = [...spot.dataValues.Bookings];

    for (let booking of spotCopy) {
      delete booking.dataValues.User;
      delete booking.dataValues.id;
      delete booking.dataValues.createdAt;
      delete booking.dataValues.updatedAt;
      delete booking.dataValues.userId;
      booking.dataValues.startDate = formatStartAndEndDate(
        booking.dataValues.startDate
      );
      booking.dataValues.endDate = formatStartAndEndDate(
        booking.dataValues.endDate
      );
    }
    bookingInfo.push(spotCopy);
  }

  res.json({ Bookings: bookingInfo });
});

// GET Spot by ID---------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------

router.get("/:spotId", async (req, res, next) => {
  const id = req.params.spotId;

  const spot = await Spot.findByPk(id, {
    include: [
      {
        model: Review,
        attributes: ["id", "stars"],
      },
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
    // attributes: {
    //   include: [
    //     [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgRating"],
    //   ],
    //   exclude: [],
    // },
  });

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
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

  let spotCopy = {
    ...spot.dataValues,
    numReviews,
    avgRating,
    price: fortmattedPrice,
  };

  delete spotCopy.Reviews;

  const spotRes = formatSpotResponse(spotCopy);

  res.json(spotRes);
});

// Get all SPOTS WITH QUERIES----------------------------------------------------------------
// ----------------------------------------------------------------------------------------------
router.get("/", validateQueries, async (req, res, next) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;
  if (!page) page = 1;
  if (!size) size = 20;
  page = parseInt(page);
  size = parseInt(size);
  const limit = size;
  const offset = size * (page - 1);
  let whereObj = {};
  if (minLat || maxLat) {
    whereObj.lat = {};
    if (minLat) whereObj.lat[Op.gt] = parseFloat(minLat);
    if (maxLat) whereObj.lat[Op.lt] = parseFloat(maxLat);
  }

  if (minLng || maxLng) {
    whereObj.lng = {};
    if (minLng) whereObj.lng[Op.gt] = parseFloat(minLng);
    if (maxLng) whereObj.lng[Op.lt] = parseFloat(maxLng);
  }

  if (minPrice || maxPrice) {
    whereObj.price = {};
    if (minPrice) whereObj.price[Op.gt] = parseFloat(minPrice);
    if (maxPrice) whereObj.price[Op.lt] = parseFloat(maxPrice);
  }

  const newBody = await findAllSpotsWithPagination(limit, offset, whereObj); //helper func located in utils/helper

  let newBodyCopy = { Spots: newBody, page, size };
  res.json(newBodyCopy);
});

// CREATE A BOOKING by spot id-----------------------------------------------
// ----------------------------------------------------------------------------------------------

router.post(
  "/:spotId/bookings",
  requireAuth,

  async (req, res, next) => {
    const { startDate, endDate } = req.body;
    const today = new Date().toISOString().split("T")[0];
    const errors = [];
    const parsedStartDate = new Date(startDate).getTime();
    const parsedEndDate = new Date(endDate).getTime();
    const parsedToday = new Date(today).getTime();

    if (parsedStartDate <= parsedToday) {
      const error = new Error("startDate cannot be in the past");
      errors.push({ startDate: error.message });
    }

    if (parsedEndDate <= parsedStartDate) {
      const error = new Error("endDate cannot be on or before startDate");
      errors.push({ endDate: error.message });
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: "Bad Request", errors: errors });
    }

    const userId = req.user.id;

    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId, {
      include: {
        model: Booking,
        attributes: ["startDate", "endDate"],
      },
    });

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    if (spot.dataValues.ownerId === userId) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    const bookingErrors = {};

    for (let booking of spot.dataValues.Bookings) {
      const bookingCopy = { ...booking.dataValues };
      const parsedBookingStart = new Date(bookingCopy.startDate).getTime();
      const parsedBookingEnd = new Date(bookingCopy.endDate).getTime();

      if (
        parsedBookingStart == parsedStartDate ||
        parsedBookingEnd == parsedStartDate ||
        (parsedBookingStart <= parsedStartDate &&
          parsedBookingEnd >= parsedStartDate)
      ) {
        if (!bookingErrors.startDate) {
          const error = new Error(
            "Start date conflicts with an existing booking"
          );
          bookingErrors.startDate = error.message;
        }
      }

      if (
        parsedBookingStart == parsedEndDate ||
        parsedBookingEnd == parsedEndDate ||
        (parsedBookingStart <= parsedEndDate &&
          parsedBookingEnd >= parsedEndDate)
      ) {
        if (!bookingErrors.endDate) {
          const error = new Error(
            "End date conflicts with an existing booking"
          );
          bookingErrors.endDate = error.message;
        }
      }

      // IF Booking start and end fall between req start and end
      if (
        parsedBookingStart >= parsedStartDate &&
        parsedBookingEnd <= parsedEndDate
      ) {
        if (!bookingErrors.startDate) {
          const error = new Error(
            "Start date conflicts with an existing booking"
          );
          bookingErrors.startDate = error.message;
        }
        if (!bookingErrors.endDate) {
          const error = new Error(
            "End date conflicts with an existing booking"
          );
          bookingErrors.endDate = error.message;
        }
      }
    }

    if (Object.keys(bookingErrors).length > 0) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: bookingErrors,
      });
    }

    const newBooking = await spot.createBooking({
      userId: userId,
      startDate: startDate,
      endDate: endDate,
    });
    const newBookingCopy = { ...newBooking.dataValues };
    newBookingCopy.startDate = formatStartAndEndDate(newBookingCopy.startDate);
    newBookingCopy.endDate = formatStartAndEndDate(newBookingCopy.endDate);
    newBookingCopy.createdAt = formatDate(newBookingCopy.createdAt);
    newBookingCopy.updatedAt = formatDate(newBookingCopy.updatedAt);
    res.json(newBookingCopy);
  }
);

//Add an Image to a spot---------------------------------------------------------
// ----------------------------------------------------------------------------------------------
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const ownerId = req.user.id; //current owner id
  const { spotId } = req.params;
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  if (spot.ownerId !== ownerId) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  const previewImage = await SpotImage.findOne({
    where: {
      spotId: spotId,
      preview: true,
    },
  });

  if (previewImage && preview == true) {
    res
      .status(400)
      .json({ message: "You may only set one preview image per spot" });
  }

  let spotImage = await spot.createSpotImage({
    url,
    preview,
  });
  spotImage = spotImage.toJSON();
  const returnImage = {
    url: spotImage.url,
    preview: spotImage.preview,
    id: spotImage.id,
  };

  res.json(returnImage);
});

// CREATE new spot review by id----------------------------------------------------------
// ----------------------------------------------------------------------------------------------

router.post(
  "/:spotId/reviews",
  requireAuth,
  validateCreateReview,
  async (req, res, next) => {
    const userId = req.user.id;
    const { spotId } = req.params;

    const { review, stars } = req.body;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    const userSpotReviews = await Review.findOne({
      where: {
        spotId: spotId,
        userId: userId,
      },
    });

    if (userSpotReviews) {
      return res.status(500).json({
        message: "User already has a review for this spot",
      });
    }

    const newReview = await spot.createReview({
      review: review,
      stars: stars,
      userId: userId,
    });

    const reviewWithId = await Review.findOne({
      where: {
        userId: userId,
        spotId: spotId,
      },
      attributes: [
        "id",
        "spotId",
        "userId",
        "review",
        "stars",
        "createdAt",
        "updatedAt",
      ],
    });
    const formattedRes = { ...reviewWithId.dataValues };
    formattedRes.createdAt = formatDate(formattedRes.createdAt);
    formattedRes.updatedAt = formatDate(formattedRes.updatedAt);
    return res.status(201).json(formattedRes);
  }
);

// CREATE a new spot----------------------------------------------------------------
// ----------------------------------------------------------------------------------------------
router.post("/", requireAuth, validateCreateSpot, async (req, res, next) => {
  const ownerId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const newSpot = await Spot.create({
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });
  const formattedSpot = formatSpotResponse({ ...newSpot.dataValues });

  return res.status(201).json(formattedSpot);
});

// Edit a spot--------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------
router.put(
  "/:spotId",
  requireAuth,
  validateCreateSpot,
  async (req, res, next) => {
    const ownerId = req.user.id; //current owner id
    const { spotId } = req.params;
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    if (spot.ownerId !== ownerId) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    await spot.update({
      address: address,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lng: lng,
      name: name,
      description: description,
      price: price,
    });

    const formattedSpot = formatSpotResponse({ ...spot.dataValues });
    res.json(formattedSpot);
  }
);

// DELETE a Spot---------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------

router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const ownerId = req.user.id; //current owner id
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  if (spot.ownerId !== ownerId) {
    return res.status(403).json({
      message: "Forbidden",
    });
  } else {
    await spot.destroy();

    res.json({
      message: "Successfully deleted",
    });
  }
});

module.exports = router;
