class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal server Error";
  err.statusCode = err.statusCode || 500;
  if (err.code === 11000) {
    const statusCode = 400;
    const message = "Duplicate Field value Entered";
    err = new ErrorHandler(message, statusCode);
  }
  if (err.name === "JsonWebTokenError") {
    const statusCode = 400;
    const message = "Invalid token, please login again";
    err = new ErrorHandler(message, statusCode);
  }

  if (err.name === "TokenExpiredError") {
    const statusCode = 400;
    const message = "Token expired, please login again";
    err = new ErrorHandler(message, statusCode);
  }

  if (err.name === "CastError") {
    const statusCode = 400;
    const message = `Invalid ${err.path} id: ${err.value}`;
    err = new ErrorHandler(message, statusCode);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};
export default ErrorHandler;
