const router = require("express").Router();
const jwt = require("jsonwebtoken");
require("dotenv").config()
const express = require("express");
const app = express();
const authorize =require("../middlewares/authorization")
const {
    Get,
    Create,
    Update,
    Delete,
    login,
    IsUser
} = require("../controller/user");

// router.get("/sellertest", (req, res) => {
//     res.send("seller Test successfully")
// })

// router.post("/userpost", (req, res) => {
//     const username = req.body.username;
//     console.log(username);
//     res.send("Your name is" + " " + username);
// })

router.post("/login", async (req, res, next) => {
    const body = req.body;
    try {
        console.log(" Rout " + process.env.SECRET_KEY);
        let user = await login(body);
        res.status(201).json({ User: user });
    } catch (err) {
        res.status(422).json(err);
    }
})

router.post("/", async (req, res, next) => {
    const body = req.body;
    try {
        let token = await Create(body);
        res.status(201).json({ Token: token });
    } catch (err) {
        res.status(422).json(err);
    }
})

// router.get("/:id", async (req, res, next) => {
//     const { id } = req.params;
//     try {
//         console.log(id);
//         const user = await Get(id);
//         console.log(user);
//         res.status(201).json({ User: user });
//     } catch (err) {
//         res.status(422).json(err);
//     }
// })

app.use(authorize);

router.patch("/:id", async (req, res, next) => {
    console.log("Patch");
    const { id } = req.params;
    const body = req.body;
    var { authorization } = req.headers;
    var decoded = jwt.verify(authorization, process.env.SECRET_KEY);
    var AuthID = decoded.id;
    try {
        console.log("B ID")
        var AuthID = decoded.id;
        console.log("B ID")
        console.log("decoded " + AuthID)
        console.log(id);
        IsUser(AuthID).then(item => {
            console.log(item);
            if (item) {
                console.log("RTURN TRUE");
                Update(id, AuthID, body).then( UpUser => {
                    console.log(UpUser);
                    res.status(201).json({ User: UpUser });
                });
            } else {
                console.log("RTURN False");
                res.status(401).json({ Message: 'Not Authorize' });
            }
        })
    } catch (err) {
        res.status(422).json(err);
    }

})

// router.delete("/:id", async (req, res, next) => {
//     const { id } = req.params;
//     var { authorization } = req.headers;
//     var decoded = jwt.verify(authorization, process.env.SECRET_KEY);
//     var AuthID = decoded.id;
//     try {
//         console.log(id);
//         const user = await Delete(id, AuthID);
//         console.log(user);
//         res.status(201).json({ User: user });
//     } catch (err) {
//         res.status(422).json(err);
//     }

// })

router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    var { authorization } = req.headers;
    var decoded = jwt.verify(authorization, process.env.SECRET_KEY);
    var AuthID = decoded.id;

    try{
        let user = await IsUser(AuthID);
        console.log(user)
        if(user)
        { 
          let result = await  Delete(id,AuthID);
          res.status(200).json({result,Message:"Deleted Sucssesfuly"})
        }else
        {
            res.status(401).json({Message:"Not Authorize"})
        }
    }catch (err) {
        res.status(422).json(err);
    }

})

module.exports = router;