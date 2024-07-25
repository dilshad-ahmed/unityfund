const axios = require("axios").default;
const crypto = require("crypto");
const { response } = require("express");

require("dotenv").config();

// setting up axios instance
const cryptomus = axios.create({
  baseURL: "https://api.cryptomus.com/v1",
});

const DEFAULT_CURRENCY = "usd";

// This function creates an invoice with a specified amount.
// Input Parameter

const createInvoice = async (amount) => {
  try {
    const data = {
      amount: amount.toString(),
      currency: DEFAULT_CURRENCY,
      order_id: crypto.randomBytes(12).toString("hex"),
      url_callback: "https://unityfund.onrender.com/api/v1/checkout/callback",
      url_success: "https://unityfund.netlify.app/",
    };

    // Generating a Signature
    // sign: A hashed string used for security, combining the base64-encoded data and the payment API key.
    const sign = crypto
      .createHash("md5")
      .update(
        Buffer.from(JSON.stringify(data)).toString("base64") +
          process.env.PAYMENT_API_KEY
      )
      .digest("hex");

    //setting headers
    const headers = {
      merchant: process.env.MERCHANT_ID,
      sign: sign,
    };

    const response = await cryptomus.post("/payment", data, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { createInvoice };
