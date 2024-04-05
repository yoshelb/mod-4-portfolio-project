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
} = require("../../utils/helpers");
const express = require("express");

const { check } = require("express-validator");
const {
  handleValidationErrors,
  validateCreateSpot,
  validateCreateReview,
} = require("../../utils/validation");

const router = express.Router();

// GET current User spot
router.get("/current", requireAuth, async (req, res, next) => {
  const ownerId = req.user.id;
  console.log(ownerId);
  const newBody = await findAllSpots({ where: { ownerId: ownerId } }); //helper func located in utils/helper
  res.json(newBody);
});

// GET REVIEWS by Spot ID
router.get("/:spotId/reviews", async (req, res, next) => {
  const spotId = req.params.spotId;

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
        on: {
          id: Sequelize.col("Review.userId"),
        },
      },
    ],
  });

  console.log(reviews);

  if (reviews.length <= 0) {
    res.status(404).json({ message: "Spot couldn't be found" });
  }

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

// GET Spot by ID
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
    res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  const numReviews = spot.dataValues.Reviews.length;

  const avgRating =
    spot.dataValues.Reviews.reduce((acc, obj) => {
      acc += obj.stars;
      return acc;
    }, 0) / numReviews;

  console.log(avgRating);

  let spotCopy = { ...spot.dataValues, numReviews, avgRating };

  delete spotCopy.Reviews;

  const spotRes = formatSpotResponse(spotCopy);

  res.json(spotRes);
});

// Get all routes
router.get("/", async (req, res, next) => {
  let newBody = await findAllSpots(); //helper func located in utils/helper
  res.json(newBody);
});

//Add an Image to a spot
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const ownerId = req.user.id; //current owner id
  const { spotId } = req.params;
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(spotId);

  if (spot.ownerId !== ownerId) {
    res.status(403).json({
      message: "Forbidden",
    });
  }

  if (!spot) {
    res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  const previewImage = await SpotImage.findOne({
    where: {
      spotId: spotId,
      preview: true,
    },
  });
  console.log(previewImage);

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

// CREATE new spot review by id

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
    res.status(201).json(formattedRes);
  }
);

// CREATE a new spot
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

  res.status(201).json(formattedSpot);
});

// Edit a spot
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
      res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    if (spot.ownerId !== ownerId) {
      res.status(403).json({
        message: "Forbidden",
      });
    }

    await spot.update({
      ownerId: ownerId,
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

// DELETE a Spot

router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const ownerId = req.user.id; //current owner id
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);

  console.log(spot);

  if (!spot) {
    res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  if (spot.ownerId !== ownerId) {
    res.status(403).json({
      message: "Forbidden",
    });
  } else {
    await spot.destroy({
      message: "Successfully deleted",
    });

    res.json({
      message: "Successfully deleted",
    });
  }
});

module.exports = router;
