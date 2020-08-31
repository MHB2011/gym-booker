const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  //Get tooken from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorisation denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwt_secret"));

    req.user = decoded.user; //this way we have access to user inside route

    try {
      const user = await User.findById(req.user.id).select("admin");

      if (parseInt(user.admin) === 1) {
        next();
      } else {
        console.log("Your status: " + JSON.stringify(req.user));
        throw "Error: Not an admin";
      }
    } catch (error) {
      res.status(401).json({ msg: "You are not administrator, access denied" });
    }
  } catch (err) {
    res.status(401).json({ msg: "Invalid token, access denied" });
  }
};
