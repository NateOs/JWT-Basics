// send email and password to login
// check if email and password valid
// send back jwt token
// setup authentication such that user with token gains access
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

// LOGIN ROUTE
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Wrong email or password");
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

/* for this route authentication process is added to the logic, but in practice, it shd
be added to a middleware and applied to all protected routes, DRY */
// DASHBOARD ROUTE
const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });

  // console.log(tokenString);
  // console.log(req.headers);
};

module.exports = {
  login,
  dashboard,
};
