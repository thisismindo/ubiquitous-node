const bookController = require("../controllers/bookController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const routeMap = {
  "/books": bookController.handleRequest,
  "/users": userController.handleRequest,
  "/generate-token": authController.handleRequest,
  "/refresh-token": authController.handleRequest,
};

const router = (req, res) => {
  const matchedRoute = Object.keys(routeMap).find(route => req.url.startsWith(route));

  if (matchedRoute) {
    routeMap[matchedRoute](req, res);
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
};

module.exports = router;
