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

// GET current User spot
router.get("/current", requireAuth, async (req, res, next) => {
  const ownerId = req.user.id;
  console.log(ownerId);
  const newBody = await findAllSpots({ where: { ownerId: ownerId } }); //helper func located in utils/helper
  res.json(newBody);
});

// Get all routes
router.get("/", async (req, res, next) => {
  let newBody = await findAllSpots(); //helper func located in utils/helper
  res.json(newBody);
});
router.post("/", requireAuth, validateCreateSpot, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
});

module.exports = router;
