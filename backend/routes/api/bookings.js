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

// EDIT A BOOKING-------------------------------------------------------------------------------

router.put(
  "/:bookingId",
  requireAuth,

  async (req, res, next) => {
    const { startDate, endDate } = req.body;

    // VALIDATE REQDATES____________________________________________
    const today = new Date().toISOString().split("T")[0];
    const errors = [];
    const parsedStartDate = new Date(startDate).getTime();
    const parsedEndDate = new Date(endDate).getTime();
    const parsedToday = new Date(today).getTime();

    if (parsedStartDate <= parsedToday) {
      const error = new Error("startDate cannot be in the past");
      errors.push({ startDate: error.message });
    }

    if (parsedEndDate < parsedStartDate) {
      const error = new Error("endDate cannot be on or before startDate");
      errors.push({ endDate: error.message });
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: "Bad Request", errors: errors });
    }

    if (parsedEndDate <= parsedToday) {
      return res.status(403).json({
        message: "Past bookings can't be modified",
      });
    }
    //VALIDATE BELONGS TO USER________________________________________
    const userId = req.user.id;

    const { bookingId } = req.params;
    const bookingToUpdate = await Booking.findByPk(bookingId);

    if (!bookingToUpdate) {
      res.status(404).json({
        message: "Booking couldn't be found",
      });
    }

    if (bookingToUpdate.dataValues.userId !== userId) {
      res.status(403).json({
        message: "Forbidden",
      });
    }

    // VALIDATE NO BOOKING CONFLICTS_______________________________________
    const spot = await Spot.findByPk(bookingToUpdate.dataValues.spotId, {
      include: {
        model: Booking,
        attributes: ["startDate", "endDate"],
      },
    });
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
    }

    if (Object.keys(bookingErrors).length > 0) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: bookingErrors,
      });
    }
    //   FINALLY ___________________Update booking______________________

    bookingToUpdate.update({
      startDate: startDate,
      endDate: endDate,
    });

    const resBooking = { ...bookingToUpdate.dataValues };
    resBooking.startDate = formatDate(resBooking.startDate);
    resBooking.endDate = formatDate(resBooking.endDate);
    resBooking.createdAt = formatDate(resBooking.createdAt);
    resBooking.updatedAt = formatDate(resBooking.updatedAt);

    res.json(resBooking);
  }
);

// DELETE A BOOKING _______________________________________________________________

router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const userId = req.user.id; //current user ID
  const { bookingId } = req.params;

  const booking = await Booking.findByPk(bookingId);

  if (!booking) {
    res.status(404).json({
      message: "Booking couldn't be found",
    });
  }

  if (booking.dataValues.userId !== userId) {
    res.status(403).json({
      message: "Forbidden",
    });
  } else {
    await booking.destroy({
      message: "Successfully deleted",
    });

    res.json({
      message: "Successfully deleted",
    });
  }
});

module.exports = router;
