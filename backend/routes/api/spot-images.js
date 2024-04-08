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
} = require("../../utils/validation");

const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const ownerId = req.user.id; //current owner id
  const { imageId } = req.params;

  const image = await SpotImage.findByPk(imageId);

  if (!image) {
    return res.status(404).json({
      message: "Spot Image couldn't be found",
    });
  }

  const spot = await Spot.findByPk(image.dataValues.spotId);

  if (spot.ownerId !== ownerId) {
    return res.status(403).json({
      message: "Forbidden",
    });
  } else {
    await image.destroy({
      message: "Successfully deleted",
    });
  }
  return res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
