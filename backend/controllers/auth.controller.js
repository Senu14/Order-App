const jwt = require('jsonwebtoken');
const utils = require('../utils');
const bcrypt = require('bcryptjs');

const db = require("../models");
const User = db.user;

exports.signin = (req, res) => {
  console.log("all data: ", req.body)
  let userEncoded = req.body.username;
  let username = userEncoded;
  // let buffUser = new Buffer(userEncoded, 'base64');
  // let username = buffUser.toString('ascii');
  let passwordEncoded = req.body.password;
  let pwd = passwordEncoded;
  // let buffPwd = new Buffer(passwordEncoded, 'base64');
  // let pwd = buffPwd.toString('ascii');

  if (!username || !pwd) {
    return res.status(400).json({
      error: true,
      message: "username or Password required."
    });
  }

  User.findOne({ where: { username: username } })
    .then(data => {
      const result = bcrypt.compareSync(pwd, data.password);
      if(!result) return  res.status(401).send('Password not valid!');

      const token = utils.generateToken(data);
      const userObj = utils.getCleanUser(data);
      return res.json({ user: userObj, access_token: token });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.isAuthenticated = (req, res, next) => {
  var token = req.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });

    User.findByPk(user.id)
      .then(data => {
        if (!user.id) {
          return res.status(401).json({
            error: true,
            message: "Invalid user."
          });
        }
        next();
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
  });
};