// Express
const express = require("express");
// Applacion
const app = express();
// bcrypt
const bcrypt = require("bcrypt");
// jsonwebtoken
const jwt = require("jsonwebtoken");

require("dotenv").config();
// bodyParser
const bodyParser = require("body-parser");
// cros

const cors = require("cors");
// App use

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Define a secret key to sign the JWT
const JWT_SECRET_KEY = "my_secret_key";
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

// show Data Profile

app.get("/proile", async (req, res) => {
  const users = await UsersModel.findOne({});
  res.json(users);
});

// create Users
app.post("/singup", async (req, res) => {
  const newUser = new UsersModel(req.body);
  await newUser.save();
  res.json(req.body);
});


app.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  const user = await UsersModel.findById(userId);
  res.json(user);
});

// Login

// Define a route for user login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the user in the database
  const user = await UsersModel.findOne({ email});

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
    console.log('not found');
  }
  
  // Check if the password is correct
  if (password !== user.password) {
    return res.status(401).json({ message: "Invalid email or password" });

  }
  
  // Generate a JWT for the user
  const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY);

  // Send the token to the client
  res.json({ token });
});

// Define a middleware to verify the JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Missing authorization header" });

  }

  const token = authHeader.split(" ")[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Define a protected route
app.get("/profile", verifyToken, async (req, res) => {
  // Get the user ID from the JWT
  const userId = req.userId;
  
  // Find the user in the database
  const user = await UsersModel.findById(userId);
  
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  
  // Send the user profile to the client

});

app.listen(3002, () => {
  console.log("server Created");
});
