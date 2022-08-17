/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

//stat functions
const { findMean, findMode, findMedian } = require("./stats");

// utility function to process query string
const { convertStringToNumsArray } = require("./utils")


/** Finds mean of nums in qs: returns {operation: "mean", result } */

app.get("/mean", function (req,res) {
  const query = req.query.nums;
  const conversion = convertStringToNumsArray(query);
  const result = findMean(conversion);
  return res.send({operation: "mean", result});
})


/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req,res) {
  const query = req.query.nums;
  const conversion = convertStringToNumsArray(query);
  const result = findMedian(conversion);
  return res.send({operation: "median", result});
})

/** Finds mode of nums in qs: returns {operation: "mode", result } */
app.get("/mode", function (req,res) {
  const query = req.query.nums;
  const conversion = convertStringToNumsArray(query);
  const result = findMode(conversion);
  return res.send({operation: "mode", result});
})

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;