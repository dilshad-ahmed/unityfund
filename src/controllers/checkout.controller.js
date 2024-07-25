const paymentApi = require("../api/payment.api");

const checkout = async (req, res) => {
  try {
    console.log("checkout controller", req.body);
    const { amount } = req.body;

    const invoice = await paymentApi.createInvoice(amount);
    res.json(invoice);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { checkout };
