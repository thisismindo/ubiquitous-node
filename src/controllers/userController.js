const userService = require("../services/userService");
const { verifyJwt } = require("../middleware/jwtMiddleware");

const handleResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const handleRequest = async (req, res) => {
  try {
    if (req.method === "POST" && req.url === "/users") {
      verifyJwt(req, res, async () => {
        let body = "";
        req.on("data", (chunk) => (body += chunk.toString()));
        req.on("end", async () => {
          const { name } = JSON.parse(body);
          const id = await userService.createUser(name);
          handleResponse(res, 201, { message: "User created", id });
        });
      });

    } else if (req.method === "GET" && req.url === "/users") {
      verifyJwt(req, res, async () => {
        const users = await userService.getUsers();
        handleResponse(res, 200, users);
      });

    } else if (req.method === "PUT" && req.url.startsWith("/users/")) {
      verifyJwt(req, res, async () => {
        const id = req.url.split("/")[2];

        let body = "";
        req.on("data", (chunk) => (body += chunk.toString()));
        req.on("end", async () => {
          const { name } = JSON.parse(body);
          await userService.updateUser(id, name);
          handleResponse(res, 200, { message: "User updated" });
        });
      });

    } else if (req.method === "DELETE" && req.url.startsWith("/users/")) {
      verifyJwt(req, res, async () => {
        const id = req.url.split("/")[2];
        await userService.deleteUser(id);
        handleResponse(res, 200, { message: "User deleted" });
      });

    } else {
      handleResponse(res, 404, { error: "Not Found" });
    }
  } catch (error) {
    handleResponse(res, 400, { error: error.message });
  }
};

module.exports = { handleRequest };
