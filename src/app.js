const express = require("express");
const mongoose = require("./config/database");
const cors = require('cors');
const app = express();

app.set("secretKey", "animesApiSecret"); // jwt secret token

mongoose.connection.on(
  "error",
  console.error.bind(console, "Erro na conexão com o MongoDB!")
);

// Rotas
const users = require("./routes/users");
const posts = require("./routes/posts");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/users", users);
app.use("/post", posts);

module.exports = app;
