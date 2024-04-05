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

// get all current users reviews

router.get("/current", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const allReviewsWithUser = await Review.findAll({
    where: {
      userId: userId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
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

  const newBody = { Reviews: [] };

  for (let review in allReviewsWithUser) {
    const reviewCopy = { ...allReviewsWithUser[review].dataValues };

    const revImages = await ReviewImage.findAll({
      where: { reviewId: reviewCopy.id },
      attributes: ["id", "url"],
    });
    console.log("REVIEW IMAGE", revImages);
    const spot = await Spot.findByPk(reviewCopy.spotId, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "description"],
      },
      include: [
        {
          model: SpotImage,
          where: { preview: true },
          attributes: ["url"],
          limit: 1,
        },
      ],
    });
    let spotCopy = { ...spot.dataValues };
    // SET PREVIEW IMAGE ON SPOT
    if (spotCopy.SpotImages[0]) {
      spotCopy.previewImage = spotCopy.SpotImages[0].url;
    } else {
      spotCopy.previewImage = null;
    }
    delete spotCopy.SpotImages;

    // FORMAT REVIEW COPY
    reviewCopy.stars = parseInt(reviewCopy.stars);
    reviewCopy.createdAt = formatDate(reviewCopy.createdAt);

    reviewCopy.updatedAt = formatDate(reviewCopy.updatedAt);

    const newReview = {
      ...reviewCopy,
      ReviewImages: [...revImages],
      Spot: { ...spotCopy },
    };
    newBody.Reviews.push(newReview);
  }

  res.json(newBody);
});

// ADD an IMAGE to review by review ID

router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { reviewId } = req.params;
  const { url } = req.body;
  const review = await Review.findByPk(reviewId, {
    include: {
      model: ReviewImage,
    },
  });
  if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
    });
  }
  if (review.dataValues.userId !== userId) {
    return res.status(403).json({ message: "forbidden" });
  }

  if (review.dataValues.ReviewImages.length >= 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
    });
  }

  const reviewImage = await review.createReviewImage({
    url,
  });

  res.json({ url: reviewImage.dataValues.url, id: reviewImage.dataValues.id });
});

module.exports = router;
