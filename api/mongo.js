const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://solderandfluxtech:q1YYqFryX6smwc61@cluster0.nnsy8wh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => {
    console.log("failed");
  });
const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
  },
  image: {
    type: String,
  },
  user: {
    type: String,
  },
});

const accounts = mongoose.model("accounts", accountSchema);
const product = mongoose.model("product", productSchema);
module.exports = { accounts, product };
