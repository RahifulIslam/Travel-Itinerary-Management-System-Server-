const jwt = require("jsonwebtoken");
const config = require("../service.json");
module.exports = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(401).send("Access denied! No token provided");
    else token = token.split(" ")[1].trim();
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    if (!decoded) return res.status(400).send("Invalid token");
    req.user = decoded;
  } catch (error) {
    return res.status(401).send({
      message: error.message,
    });
  }

  next();
};
