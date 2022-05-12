const product = require("../models/product")
const authorize =require("../middlewares/authorization")
const router = require("express").Router();
const express = require("express");
const app = express();
const {Create,GetAll,GetByName,Update, Delete,GetProductBySellerName,SellerProducts,GetByID} = require("../controller/proudct");
const {CheckSeller} =require("../controller/seller");
const jwt = require("jsonwebtoken");
const { append } = require("express/lib/response");
require("dotenv").config()

//For User
router.get('/', async(req, res, next) => {
    try{
        res.status(201).json(await GetAll());
    }catch(error){
        res.status(422).json(err);
    }

})

app.use(authorize);
//Get Product of Login Seller
router.get('/sellerProducts', (req, res, next) => {
    try{
        var {authorization}=req.headers;
        var decoded = jwt.verify(authorization, process.env.SECRET_KEY);
        console.log("decoded "+decoded.id)
        CheckSeller(decoded.id).then(seller=>{
            if(seller){
                console.log("Check "+true+" "+seller);
                SellerProducts(decoded.id).then(products=>{
                    console.log(products);
                    res.status(201).json(products);
                });
            }
            else{
                console.log("Check "+false+" "+seller);
                res.status(422).json(err);
            }
        })
    }catch(err){
        res.status(422).json({Message:err});
    }
    
})

router.post("/", async(req, res, next) => {

    try {
        const body = req.body;
        var { authorization } = req.headers;
        console.log("AuthID"+AuthID);
        var decoded = jwt.verify(authorization, process.env.SECRET_KEY);
        var AuthID = decoded.id;
        console.log("authID"+AuthID);
        CheckSeller(AuthID).then(item =>{
            if(item) 
            {
                console.log("item"+item);
                Create(AuthID,body).then(product=>{
                    console.log(product);
                    res.status(201).json(product);
                });
            }
            else {
                res.status(401).json({ Message: 'Not Authorize' });
            }
        })
       
     } catch (err) {
        console.log("error");
        res.status(422).json(err);
    }
})

//search By Seller Name
router.get('/seller/:name', (req, res, next) => {
    const {name}=req.params;
    console.log(name);
    GetProductBySellerName(name).then((products)=>{
        console.log(products);
        res.status(200).json(products)
    }).catch((error)=>{
        res.status(422).json(error)
    })
})

//search By Product Name
router.get("/:name", async(req, res, next) => {
    const { name } = req.params;
    try {
        const product = await GetByName(name);
        res.status(200).json(product);
    } catch (err) {
        res.status(422).json(err);
    }
})

/*
router.delete("/:name", async(req, res, next) => {
    const { name } = req.params;
    try {
        const product = await Delete(name);
        res.status(201).json(product);
    } catch (err) {
        res.status(422).json(err);
    }

})
*/

router.patch("/:id", async(req, res, next) => {
    try{
        const { id } = req.params;
        const body = req.body;
        var {authorization}=req.headers;
        var decoded = jwt.verify(authorization, process.env.SECRET_KEY);
        console.log("decoded "+decoded.id)
        CheckSeller(decoded.id).then(seller=>{
            if(seller){
                console.log("Check "+true+" "+seller);
                GetByID(id).then(pro=>{
                    console.log("pro..."+pro);
                    console.log("pro._id..."+pro.id);
                    const {sellerID} = pro;
                    console.log("sellerID..."+ sellerID);
                     if (sellerID==decoded.id)
                    {
                        console.log("sellerID = ProSellerId");
                        console.log("product");
                         Update(id,body).then(pro=>{
                            console.log(pro);
                            res.status(201).json(pro);
                         });
                    }
                    else
                    {
                        console.log("sellerID !!!!!!!= ProSellerId");
                        res.status(422).json({Message:"This is not your product"});
                    }
                })
            }
            else{
                console.log("Check "+false+" "+seller);
                res.status(422).json({Message:"You are not a seller"});
            }
        })
    }catch(error){
        res.status(422).json({Message:error});
    }

})



router.delete("/:id", async(req, res, next) => {
    try{
        const { id } = req.params;
        const body = req.body;
        var {authorization}=req.headers;
        var decoded = jwt.verify(authorization, process.env.SECRET_KEY);
        console.log("decoded "+decoded.id)
        CheckSeller(decoded.id).then(seller=>{
            if(seller){
                console.log("Check "+true+" "+seller);
                GetByID(id).then(pro=>{
                    console.log("pro..."+pro);
                    console.log("pro._id..."+pro.id);
                    const {sellerID} = pro;
                    console.log("sellerID..."+ sellerID);
                     if (sellerID==decoded.id)
                    {
                        console.log("sellerID = ProSellerId");
                        console.log("product");
                         Delete(id,body).then(pro=>{
                            console.log(pro);
                            res.status(201).json(pro);
                         });
                    }
                    else
                    {
                        console.log("sellerID !!!!!!!= ProSellerId");
                        res.status(422).json({Message:"This is not your product"});
                    }
                })
            }
            else{
                console.log("Check "+false+" "+seller);
                res.status(422).json({Message:"You are not a seller"});
            }
        })
    }catch(error){
        res.status(422).json({Message:error});
    }

})


module.exports=router;