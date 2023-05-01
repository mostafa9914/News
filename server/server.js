const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

// UserModel
const UsersModel = require("./models/Users");
// Connent
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/NewsScariping");

// Show Data
app.get("/users", async (req, res) => {
  const users = await UsersModel.find({});
  res.json(users);
});

// create Users
app.post("/createUser", async (req, res) => {
  const newUser = new UsersModel(req.body);
  await newUser.save();
  res.json(req.body);
});

app.listen(3001, () => {
  console.log("server Created");
});
