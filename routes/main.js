const express = require("express");
const router = express.Router();

const authenticationMiddleware = require("../middleware/auth");
const { login, dashboard } = require("../controllers/main");

router.route("/dashboard").get(authenticationMiddleware, dashboard); // means auth will intercept requests and call next middleware, dashboard
router.route("/login").post(login);

module.exports = router;
