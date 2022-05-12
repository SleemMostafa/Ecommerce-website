const router = require("express").Router();

const { Create,findOne,login  } = require("../controller/seller");


router.get("/:name",async(req,res, next)=>{
    try{
    var {name} =req.params;
    var seller =await findOne(name)
    res.status(201).json(seller);
    }
    catch(err)
    {
    res.status(422).json(err);

    }
})

router.post("/", async(req, res, next) => {
    const body = req.body;
        var seller = await Create(body);
        res.json(seller);
    
})

router.post("/login", async(req, res, next) => {
    const body = req.body;
    try {
        console.log(" Rout "+process.env.SECRET_KEY);
        let seller = await login(body);
        res.status(201).json({ token: seller });
    } catch (err) {
        res.status(422).json(err);
    }
})
module.exports= router;