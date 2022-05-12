const express = require('express');
const jwt = require("jsonwebtoken");
require("dotenv").config()
const app = express();
var router = express.Router();
const authorize =require("../middlewares/authorization")

const { findOrders, createOrder } = require('../controller/orders')
// router.get("/", async (req, res, next) => {
//   var orders = await findOrders();
//   if (orders) {
//     res.json(orders);
//   } else {
//     res.json({ message: "orders not found" });
//   }
// });
app.use(authorize);

router.post("/", async (req, res, next) => {
  try{
    var {authorization}=req.headers;
    var decoded = jwt.verify(authorization, process.env.SECRET_KEY);
    console.log("decoded "+decoded.id) 
    createOrder(decoded.id, req.body).then((order) => {
      res.status(201).json(order)
    }).catch((err) => {
      res.status(422).json(err)
    })
  }catch(error){
    res.status(401).json({error})
  }
});

module.exports = router;







