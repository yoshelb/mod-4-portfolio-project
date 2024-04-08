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
const review = require("../../db/models/review");

const router = express.Router();

// DELETE a review image

router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { imageId } = req.params;
  const image = await ReviewImage.findByPk(imageId);

  if (!image) {
    return res.status(404).json({
      message: "Review Image couldn't be found",
    });
  }
  const review = await Review.findByPk(image.dataValues.reviewId);

  if (review.dataValues.userId !== userId) {
    return res.status(403).json({ message: "forbidden" });
  }

  image.destroy();

  return res.status(200).json({
    message: "Successfully deleted",
  });
});

module.exports = router;
