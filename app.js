const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const helmet = require("helmet");

app.use(cors());
app.use(express.json());
app.use(helmet());

// custom modules
const home = require("./src/routes/home.routes");
const checkout = require("./src/routes/checkout.routes");
app.use("/api/v1", home);
app.use("/api/v1", checkout);

app.get("/", (req, res) => {
  res.send("API is working...");
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 8000");
});
