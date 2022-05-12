const jwt = require("jsonwebtoken");
require("dotenv").config()

const authorize = (req, res, next) => {
    var { authorization } = req.headers;
    jwt.verify(authorization, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            return res.status(401).end();
        }
        next();
    });
};

module.exports = authorize;