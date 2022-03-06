require("dotenv").config({ path: "./src/config/.env" });
const express = require("express");
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ name: "Server", message: "Hello from server!" });
});

// Exporting app
module.exports = app;
