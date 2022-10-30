// send email and password to login
// check if email and password valid
// send back jwt token
// setup authentication such that user with token gains access
const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("Wrong email or password", 400);
  }

  // generating fake id, this is usually available from db after account creation
  const id = new Date().getDate();

  // try to keep payload small, results in better user experience
  // pass in payload, secret and options
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const bearerString = req.headers.authorization;

  if (!bearerString || !bearerString.startsWith("Bearer ")) {
    throw new CustomAPIError("Unauthorized, no user token", 401);
  }

  const tokenString = bearerString.split(" ")[1];

  try {
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);

    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({
      msg: `Hello, John Doe`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError("Unauthorized to access route", 400);
  }
  // console.log(tokenString);
  // console.log(req.headers);
};

module.exports = {
  login,
  dashboard,
};
