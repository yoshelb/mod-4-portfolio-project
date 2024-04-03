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

const { findAllSpots } = require("../../utils/helpers");
const express = require("express");

const { check } = require("express-validator");
const {
  handleValidationErrors,
  validateCreateSpot,
} = require("../../utils/validation");

const router = express.Router();

// GET current User spot
router.get("/current", requireAuth, async (req, res, next) => {
  const ownerId = req.user.id;
  console.log(ownerId);
  const newBody = await findAllSpots({ where: { ownerId: ownerId } }); //helper func located in utils/helper
  res.json(newBody);
});

// GET Spot by ID
router.get("/:spotId", async (req, res, next) => {
  const id = req.params.spotId;

  const spot = await Spot.findByPk(id, {
    include: [
      {
        model: Review,
        attributes: [],
        where: { spotId: id },
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
    attributes: {
      include: [
        [
          Sequelize.fn("COUNT", Sequelize.literal("DISTINCT Reviews.id")),
          "numReviews",
        ],
        [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgRating"],
      ],
      exclude: [],
    },
    group: ["Spot.id"],
  });

  if (!spot) {
    res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  res.json(spot);
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
  console.log(spot.toJSON());
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

  res.json(newSpot);
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

    res.json(spot);
  }
);

// DELETE Spot Image

// DELETE a Spot

router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const ownerId = req.user.id; //current owner id
  console.log(ownerId);
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
