const express = require("express");
const { accounts, product } = require("./mongo");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser"); // Import bodyParser
app.use("/images", express.static(path.join(__dirname, "database", "images")));

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(cors());

app.get("/", cors(), (req, res) => {
  res.send("Welcome to the root endpoint");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

///////////////////////////////////////////////////////////////////////////////////
// Signup response
app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    // Check if the username already exists in the database
    const existingUser = await accounts.findOne({ username });
    if (existingUser) {
      // If the user already exists, send a response indicating so
      return res.status(201).json({ message: "User already exists" });
    } else {
      const newUser = new accounts({ username, password, email });

      await newUser.save();
      return res.status(201).json({ message: "Registration Success" });
    }
  } catch (error) {
    console.error(`Error in POST /loginpage: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login Response
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const existingUser = await accounts.findOne({ username, password });
    if (existingUser) {
      const token = jwt.sign({ username: existingUser.username }, "secret_key");
      // Include token in response
      return res.status(200).json({ message: "exist", token, username });
    } else {
      return res.status(200).json({ message: "not exist" });
    }
  } catch (error) {
    console.error(`Error in POST /login: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

///////////////////////////////////////////////////////////////////////////////////
// Define storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/src/database/images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${Math.floor(Math.random() * 1000)}.png`);
  },
});

const upload = multer({ storage: storage });
//Add Product Response
app.post("/addproduct", upload.single("image"), async (req, res) => {
  const { name, price, user } = req.body;
  const imageName = req.file.filename;
  const newProduct = new product({ name, price, image: imageName, user });
  await newProduct.save();
  if (!req.file) {
    return res
      .status(201)
      .json({ message: "No image file received", imageName, user });
  }

  res.json({ message: "OK", imageName: req.file.filename });
});
///////////////////////////////////////////////////////////////////////////////////

// fetch products
app.get("/displayProduct", async (req, res) => {
  const { name, price, image } = req.query;
  try {
    const query = {};
    if (name) query.name = name;
    if (price) query.price = price;
    if (image) query.image = image;
    // Fetch all products from the database
    const productsItem = await product.find(query);
    res.json(productsItem);
  } catch (error) {
    console.error(`Error fetching products: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

///////////////////////////////////////////////////////////////////////////////

//Fetch userdata and userProduct AccountWindow component

app.post("/accountinfo", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const findUserData = await accounts.findOne({ username });
    if (findUserData) {
      res.json(findUserData);
    }
  } catch (error) {
    console.error(`Error fetching products: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/getuserproduct", async (req, res) => {
  const { user } = req.body;
  console.log(user);
  try {
    const findUserData = await product.find({ user });
    if (findUserData) {
      res.json(findUserData);
    }
  } catch (error) {
    console.error(`Error fetching products: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
});
//Update Password Route
app.post("/savepassword", async (req, res) => {
  const { username, newPassword } = req.body;
  try {
    // Find the user in the database by username
    const user = await accounts.find({ username });
    if (user) {
      // Update the user's password
      user.password = newPassword;
      await user.save();
      // Send a success response
      return res.status(200).json({ message: "Password updated successfully" });
    } else {
      // If user is not found, send an error response
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(`Error updating password: ${error}`);
    // Handle errors and send an error response
    res.status(500).json({ message: "Internal server error" });
  }
});

//remove product of user
app.post("/removeuserproduct", async (req, res) => {
  const { _id } = req.body;
  try {
    const productToRemove = await product.findOneAndDelete({
      _id: _id,
    });
    if (!productToRemove) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
