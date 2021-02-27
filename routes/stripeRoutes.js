const express = require('express');
const bodyParser = require('body-parser');
const requireLogin = require('../middleware/requireLogin');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');


dotenv.config()


const stripe = require("stripe")(process.env.STRIPE_KEY);



const router = express.Router();
const jsonParser = bodyParser.json();


router.post("/",jsonParser,async (req, res) => {
   
    let error;
    let status;
    try {
      const { total, tokenParam  } = req.body;
      console.log('total is :',total,' and its type is ',typeof total);
      const customer = await stripe.customers.create({
        email: tokenParam.email,
        source: tokenParam.id
      });
  
      const idempotencyKey = uuidv4();
      const charge = await stripe.charges.create(
        {
          amount: total*100,
          currency: "usd",
          customer: customer.id,
          receipt_email: tokenParam.email,
          shipping: {
            name: tokenParam.card.name,
            address: {
              line1: tokenParam.card.address_line1,
              line2: tokenParam.card.address_line2,
              city: tokenParam.card.address_city,
              country: tokenParam.card.address_country,
              postal_code: tokenParam.card.address_zip
            }
          }
        },
        {
          idempotencyKey
        }
      );
      console.log("Charge:", { charge });
      status = "success";
    } catch (error) {
      console.error("Error:", error);
      status = "failure";
    }
  
    res.json({ error, status });
  });
  
module.exports = router;