// backend/utils/validation.js
const { query, validationResult } = require("express-validator");
const express = require("express");

const { check } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach((error) => (errors[error.path] = error.msg));

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

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
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be within -90 and 90"),
  check("lng")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be within -180 and 180"),
  check("name")
    .isLength({ min: 1, max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .isFloat({ min: 0 })
    .withMessage("Price per day must be a positive number"),
  handleValidationErrors,
];

const validateCreateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];
const today = new Date().toISOString().split("T")[0];
const validateCreateBooking = [
  check("startDate")
    .isAfter(today)
    .withMessage("startDate cannot be in the past"),
  check("endDate").custom((endDate, req) => {
    console.log(req);
    const { startDate } = req.transformedData;
    if (endDate <= startDate) {
      throw new Error("endDate cannot be on or before startDate");
    }
  }),
  handleValidationErrors,
];

const validateQueries = [
  query("page")
    .isInt({ min: 1 })
    .optional()
    .withMessage("Page must be greater than or equal to 1"),
  query("size")
    .isInt({ min: 1 })
    .optional()
    .withMessage("Size must be greater than or equal to 1"),
  query("maxLat")
    .isFloat({ min: -90, max: 90 })
    .optional()
    .withMessage("Maximum latitude is invalid"),
  query("minLat")
    .isFloat({ min: -90, max: 90 })
    .optional()
    .withMessage("Minimum latitude is invalid"),
  query("minLng")
    .isFloat({ min: -180, max: 180 })
    .optional()
    .withMessage("Maximum longitude is invalid"),
  query("maxLng")
    .isFloat({ min: -180, max: 180 })
    .optional()
    .withMessage("Maximum longitude is invalid"),
  query("minPrice")
    .isFloat({ min: 0 })
    .optional()
    .withMessage("Minimum price must be greater than or equal to 0"),
  query("maxPrice")
    .isFloat({ min: 0 })
    .optional()
    .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateCreateSpot,
  validateCreateReview,
  validateCreateBooking,
  validateQueries,
};
