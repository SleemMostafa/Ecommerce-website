const userModel = require('../models/user');
const UserModel = require('../models/user');
const jwt = require("jsonwebtoken");
require("dotenv").config()
const bcrypt = require('bcryptjs');

/*
1-Get Done
2-Post @RaniaMahmoud Not Yet
3-Put --Done
4-Delete --Done
 */
//@RaniaMahmoud

async function Get(id) {
    let user = await userModel.findOne({ _id: id });
    console.log(user);
    return user;
}
//ToDo @RaniaMahmoud Must Do LogIn token
//isAdmin????
async function Create({ name, password, isAdmin }) {
    let user = await userModel.create({ name: name, password: password, isAdmin: isAdmin });
    console.log("User Fun " + user);
    if (user) {
        return jwt.sign({
            name: user.name,
            id: user._id
        },
            process.env.SECRET_KEY,
            {
                expiresIn: "1h"
            });
    } else {
        res.status(401).end();
    }
}

async function Update(id, AuthID, { name, password }) {
    if (id == AuthID) {

        await UserModel.findOneAndUpdate({ _id: id }, {
            name: name,
            password: password
        })
        let user = await Get(id)
        console.log(user);
        return user;
    } else {
        return "Not Authorize";
    }
}
async function Delete(id, AuthID) {
    if (id == AuthID) {
        let user = await UserModel.findOneAndDelete({ _id: id })
        console.log(user);
        return user;
    } else {
        return "Not Authorize";
    }
}

async function login({ name, password }) {
    console.log("NAME =" + name);
    var user = await userModel.findOne({ name: name });
    console.log("user =" + user);
    console.log("Login");
    if (user) {
        console.log("Login IF");
        var valid = await bcrypt.compare(password, user.password);
        console.log("Login IF 2 " + valid);
        if (valid) {
            console.log("Afetr " + process.env.SECRET_KEY);
            return jwt.sign({
                name: user.name,
                id: user._id
            },
                process.env.SECRET_KEY,
                {
                    expiresIn: "1h"
                });
        }
        else {
            res.status(401).end();
        }
    } else {
        res.status(422).end();
    }
}

async function IsUser(id){
    return await UserModel.findOne({_id:id});
}

// function IsUser(id) {
//     UserModel.findOne({ _id: id }).then(user => {
//         if (user) {
//             console.log(user + " true");
//             return true;
//         } else {
//             console.log(user + " false");
//             return false;
//         }
//     });
// }

module.exports = { Get, Create, Update, Delete, login, IsUser };