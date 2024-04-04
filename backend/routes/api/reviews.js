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

const { findAllSpots, formatSpotResponse } = require("../../utils/helpers");
const express = require("express");

const { check } = require("express-validator");
const {
  handleValidationErrors,
  validateCreateSpot,
  validateCreateReview,
} = require("../../utils/validation");

const router = express.Router();

router.get("/current", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const allReviews = await Review.findAll({
    where: {
      userId: userId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  console.log(allReviews);
});

module.exports = router;
