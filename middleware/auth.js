const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  //check for the token
  if (!token)
    return res.status(401).json({ msg: "No token, failed to authorize" });

  try {
    //verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //add User from payload
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
