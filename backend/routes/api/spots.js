const { setTokenCookie, restoreUser } = require("../../utils/auth");
const {
  Spot,
  Booking,
  Review,
  ReviewImage,
  SpotImage,
  User,
  Sequelize,
} = require("../../db/models");
const express = require("express");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateCreateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .isNumeric({ min: -90, max: 90 })
    .withMessage("Latitude must be within -90 and 90"),
  check("lng")
    .isNumeric({ min: -180, max: 180 })
    .withMessage("Longitude must be within -180 and 180"),
  check("name")
    .isLength({ min: 1, max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .isNumeric({ min: 0 })
    .withMessage("Price per day must be a positive number"),
  handleValidationErrors,
];

router.get("/", async (req, res, next) => {
  const spots = await Spot.findAll({
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

    newBody.push(spotWithExtraData);
  });

  res.json(newBody);
});
router.post("/", validateCreateSpot, async (req, res, next) => {});

module.exports = router;
