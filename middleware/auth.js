const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  const bearerString = req.headers.authorization;
  console.log(bearerString);
  if (!bearerString || !bearerString.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }

  const tokenString = bearerString.split(" ")[1];

  try {
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
    console.log(decoded);
    const { id, username } = decoded;
    req.user = { id, username }; // creating a user object on request that is accessible from the dashboard endpoint (next)
    next();
  } catch (error) {
    throw new UnauthenticatedError("Unauthorized to access route");
  }
};

module.exports = authenticationMiddleware;
