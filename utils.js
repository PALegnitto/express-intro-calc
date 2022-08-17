const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route

  const listOfNums = strNums.map(str => parseInt(str));
  if (listOfNums.includes(NaN)){
    throw new BadRequestError("Not all items could be converted to numbers");
  }

  return listOfNums;
}

/** Converts a string from our query to an array of nums */

function convertStringToNumsArray(queryString) {
  const numsGroup = queryString.split(",");
  return convertStrNums(numsGroup)
}


module.exports = { convertStringToNumsArray };