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
  validateCreateBooking,
} = require("../../utils/validation");

const router = express.Router();

// GET Current users BOOKINGS

router.get("/current", requireAuth, async (req, res, next) => {
  const userId = req.user.id;

  const bookings = await Booking.findAll({
    where: { userId: userId },
    include: {
      model: Spot,
      attributes: {
        exclude: ["createdAt", "updatedAt", "description"],
      },
      include: {
        model: SpotImage,
        attributes: ["url"],
        where: {
          preview: true,
        },
      },
    },
  });
  //   console.log(bookings);
  const bookingsCopy = [];

  for (let booking of bookings) {
    const bookingCopy = { ...booking.dataValues };
    console.log("BOOKING COPY", bookingCopy);
    bookingCopy.startDate = formatDate(bookingCopy.startDate);
    bookingCopy.endDate = formatDate(bookingCopy.endDate);
    bookingCopy.createdAt = formatDate(bookingCopy.createdAt);
    bookingCopy.updatedAt = formatDate(bookingCopy.updatedAt);
    bookingCopy.Spot.dataValues.lat = parseFloat(
      bookingCopy.Spot.dataValues.lat
    );
    bookingCopy.Spot.dataValues.lng = parseFloat(
      bookingCopy.Spot.dataValues.lng
    );
    bookingCopy.Spot.dataValues.price = parseFloat(
      bookingCopy.Spot.dataValues.price
    );

    if (bookingCopy.Spot.dataValues.SpotImages[0].url) {
      // make new preview image key with url in it
      bookingCopy.Spot.dataValues.previewImage =
        bookingCopy.Spot.dataValues.SpotImages[0].url;
      // remove SpotImage
      delete bookingCopy.Spot.dataValues.SpotImages;
    }
    bookingsCopy.push(bookingCopy);
  }

  res.json({ Bookings: bookingsCopy });
});

module.exports = router;
