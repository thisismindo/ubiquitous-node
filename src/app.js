const http = require("http");
const router = require("./routes/router");

const server = http.createServer((req, res) => {
  router(req, res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
