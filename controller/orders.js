const orderModel = require("../models/orders");
function findOrders() {
    var orders = orderModel.find({});
    return orders;
  }

  function createOrder(id,{products,createdat}) {
    console.log(id);
    var order= orderModel.create({userId:id,products:products,createdat:createdat});
    console.log(order);
    return order;
  }

  module.exports = {  findOrders, createOrder};