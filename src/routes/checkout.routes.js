const router = require("express").Router();
const { checkout } = require("../controllers/checkout.controller");

router.post("/checkout", checkout);

module.exports = router;
