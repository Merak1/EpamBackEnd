import chalk from "chalk";

const warning = chalk.hex("#FFA500");
const blue = chalk.hex("#00a1be");
const yellow = chalk.hex("#beb100");
const pink = chalk.hex("#eb51d6");
const salmon = chalk.hex("#ff4f4f");

// function logErrBlue(err) {
//   console.error(err);
// }

// function logErrYellow(err) {
//   console.error(err);
// }
// function logErrPink(err) {
//   console.error(err);
// }
// function logErrSalmon(err) {
//   console.error(err);
// }
function logError(err) {
  console.error(err);
}

function logErrorMiddleware(err, req, res, next) {
  logError(err);
  next(err);
}

function returnError(err, req, res, next) {
  res.status(err.statusCode || 500).send(err.message);
}

function isOperationalError(error) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}

module.exports = {
  logError,
  logErrorMiddleware,
  returnError,
  isOperationalError,
};
