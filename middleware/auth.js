const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const authenticationMiddleware = async (req, res, next) => {
  const bearerString = req.headers.authorization;
  console.log(bearerString);
  if (!bearerString || !bearerString.startsWith("Bearer ")) {
    throw new CustomAPIError("Unauthorized, no user token", 401);
  }

  const tokenString = bearerString.split(" ")[1];

  try {
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
    console.log(decoded);
    const { id, username } = decoded;
    req.user = { id, username }; // creating a user object on request that is accessible from the dashboard endpoint (next)
    next();
  } catch (error) {
    throw new CustomAPIError("Unauthorized to access route", 400);
  }
};

module.exports = authenticationMiddleware;
