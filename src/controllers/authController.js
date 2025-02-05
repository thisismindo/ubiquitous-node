const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const handleResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const generateToken = () => {
  const payload = { userId: "anonymous" };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
  });

  return { accessToken, refreshToken };
};

const handleRequest = async (req, res) => {
  try {
    if (req.method === "POST" && req.url === "/generate-token") {
      const tokens = generateToken();
      handleResponse(res, 200, tokens);

    } else if (req.method === "POST" && req.url === "/refresh-token") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          if (!body) {
            return handleResponse(res, 400, { error: "Empty request body" });
          }

          const parsedBody = JSON.parse(body);
          const { refreshToken } = parsedBody;

          if (!refreshToken) {
            return handleResponse(res, 400, { error: "Refresh token is required" });
          }

          jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
              return handleResponse(res, 403, { error: "Invalid or expired refresh token" });
            }

            const newTokens = generateToken();
            handleResponse(res, 200, newTokens);
          });
        } catch (err) {
          handleResponse(res, 400, { error: "Invalid JSON format" });
        }
      });

    } else {
      handleResponse(res, 404, { error: "Not Found" });
    }
  } catch (error) {
    handleResponse(res, 500, { error: "Internal Server Error" });
  }
};

module.exports = { handleRequest };
