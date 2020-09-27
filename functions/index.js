const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HQs9CHIWXA8KdYnSYDgxSZTz7y2IAwPZ2wlI0hStDMXBfKJTFlL5sLiq9edTLtHkPJHpgvyetkLhkDjbFZqoUcf008sS8CXKo"
);


const app = express();

app.use(cors({ origin: true }));
app.use(express.json());



app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, 
    currency: "inr",
  });


  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});


exports.api = functions.https.onRequest(app);