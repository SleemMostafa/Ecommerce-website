const express = require("express");
const app = express();
require("dotenv").config()
// const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./route/user");
const orderRoute=require("./route/orders");
const dotenv = require("dotenv");
const productRoute = require("./route/product");
const sellerRoute= require("./route/seller"); 

dotenv.config();

//@RaniaMahmoud Test conection on My MongoDB >>>>>(I transfer url to file .env)
mongoose.connect(process.env.MONGO_URL, () => {
console.log("conected to db");
});


app.use(express.json());
app.use("/user", userRoute);
app.use("/product", productRoute)
app.use("/order",orderRoute);
app.use("/seller", sellerRoute); 

app.listen(3400, () => {
  console.log("app started listening on port 3500");
  console.log(process.env.SECRET_KEY)
});

