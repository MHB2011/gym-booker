const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //Get tooken from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorisation denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwt_secret"));

    req.user = decoded.user; //this way we have access to user inside route
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token, access denied" });
  }
};
