const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: "https://frontend-r9mnwb2rs-vaibhav-mathurs-projects.vercel.app/",
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.options('*', cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.get("/", (req, res) => {
  res.send("Shopease Backend is running!");
});

app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });
    const options = req.body;
    const order = await razorpay.orders.create(options); // Use the razorpay instance
    if (!order) {
      return res.status(500).send("Error creating order");
    }
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err.message);
  }
});
app.post("/order/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY);

  // Correct the string concatenation
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ Message: "Transaction not legal" });
  }
  res.json({
    Message: "Success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});