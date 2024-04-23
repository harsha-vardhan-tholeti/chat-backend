function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  Error.captureStackTrace(error, createError);

  return error;
}

module.exports = createError;
