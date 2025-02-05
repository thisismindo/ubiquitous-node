const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyJwt = (req, res, callback) => {
  console.log("Received headers:", req.headers);
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.writeHead(401, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Token is required" }));
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.writeHead(401, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Invalid authorization format" }));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.writeHead(403, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid or expired token" }));
    }

    req.user = decoded;
    callback();
  });
};

module.exports = { verifyJwt };
