const express = require("express");
const { UserModel } = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { email, passwd, name, age } = req.body;

  try {
    bcrypt.hash(passwd, 5, async (err, hashPasswd) => {
      const user = new UserModel({ email, passwd: hashPasswd, name, age });
      await user.save();

      res.status(200).send({ "msg": "User created successfully" });
    });
  }
  catch (err) {
    res.status(400).send({ "err": err.message });
  }
});


userRouter.post("/login", async (req, res) => {
  const { email, passwd } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    console.log(user);

    if (user) {
      bcrypt.compare(passwd, user.passwd, function (err, result) {
        if (result) {
          const token = jwt.sign({ authorId: user._id, author: user.name }, "randomSecretKey");
          res.status(200).send({ "msg": "Logged-in successfully", "token": token });
        }
        else {
          res.status(200).send({ "msg": "Wrong credentials" });
        }
      });
    }
    else {
      res.status(200).send({ "msg": "Wrong credentials" });
    }
  }
  catch (err) {
    res.status(400).send({ "err": err.message });
  }
});


module.exports = {
  userRouter
}