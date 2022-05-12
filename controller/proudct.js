const productModel = require('../models/product');
const sellerHelper=require('../controller/seller');



async function Create(AuthID,{ name, description, price, photo }) {

    //   let product = await productModel.create(
    //     {name:name,description:description,price:price,photo:photo,sellerID:sellerID });
    //     console.log(product);
        // let seller = await 
        // console.log(seller);
        //return await sellerHelper.AddProduct(sellerID,product._id);

        return await productModel.create({name:name,description:description,price:price,photo:photo,sellerID:AuthID });
}
//For User  محدش يغيرها
async function GetAll() {
    let products = await productModel.find({})
    return products;
}

async function SellerProducts(id) {
    console.log(id);
    // let products = ;
    // console.log("asds  "+products);
    return await productModel.find({sellerID:id});
}

async function GetByName(name) {
    let product = await productModel.findOne({ name: name });
    return product;
}
// after auth
async function GetProductBySellerName(name) {
    console.log(name);

   return sellerHelper.GetProductsBySellerName(name);
}

async function Update(id, { name,description, price,photo}) {
    console.log("INFUNCtion")
    await productModel.findByIdAndUpdate({ _id: id },
    {
        name:name,
        description: description,
        price: price,
        photo: photo,
    })
    let product = await productModel.findOne({_id:id});
    console.log(product);
    return product;
}
async function Delete(id) {
    let product = await productModel.findOneAndRemove({ _id: id})
    console.log(product);
    return product;
}

async function GetByID(id) {
    let pro = await productModel.findOne({_id:id});
    return pro;
}
module.exports = {Create,GetAll,GetByName,Update, Delete,GetProductBySellerName,SellerProducts,GetByID};