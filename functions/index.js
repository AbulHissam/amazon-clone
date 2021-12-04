const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51JxbsrSAVjkzFXhMyFkR5uzQmxRLUVtG7KiLEg8Wr1KuLURpMYA6BCkZSNsL1iXtwyIxdgUy7KmueVFGyzcSZlfz00iPvANC2i"
);

// API

// API config
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment request received", total);
  try {
    const paymentResponse = await stripe.paymentIntents.create({
      amount: total,
      currency: "inr",
    });
    res.status(200).send({
      clientSecret: paymentResponse.client_secret,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

// Listen
exports.api = functions.https.onRequest(app);

// http://localhost:5001/clone-17ec5/us-central1/api

// firebase init
// set up cloud functions to get this functions directory

// firebase emulators:start
// the above command will start a server
