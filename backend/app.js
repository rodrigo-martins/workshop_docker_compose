const express = require("express");
const restful = require("node-restful");
const server = express();
const mongoose = restful.mongoose;
const bodyParser = require("body-parser");
const cors = require("cors");

// Database
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://db/mydb");

// Middlewares
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

// Object Document Model (ODM)
const Email = restful.model("Email", {
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
});

// Rest API
Email.methods(["get", "post", "put", "delete"]);
Email.updateOptions({ new: true, runValidators: true });

// Routes
server.get("/", (_req, res) => {
  console.log("GET /");
  res.send(`OK ${process.env.MY_ENV}`);
});

Email.register(server, "/emails");

server.listen(3001);
