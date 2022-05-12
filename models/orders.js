const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");

const OrdersSchema = mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: false,
  },
  products: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "product",
      required:false
    }   
  ],
createdat:{
  type:Date,
  required:false
},
});
  const OrderModel= mongoose.model('Order', OrdersSchema);
  module.exports=OrderModel
