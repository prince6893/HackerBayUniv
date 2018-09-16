var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var bcrypt = require('bcrypt');
var User = require('./db/passportConfig');
require('./db/dbconfig');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(passport.initialize());

app.post('/user/signup', function (req, res) {
  //console.log(req);
  if (!req.body.email || !req.body.password) {
    res.status(400);
    res.send({ message: 'Please enter valid credentials' });
  }
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      if (err) {
        console.log(err);
      }
      var password = hash;
      var newUser = User.build({
        email: req.body.email,
        password: password
      });
      newUser.save().then(function (success) {
        console.log('success: ', success);
        res.status(200);
        res.send({ message: 'User Created' });
      }).catch(function (err) {
        console.log('err: ', err);
        res.status(400);
        res.send({ message: 'Email already exists' });
      })
    });
  });
});
app.listen(3003, function () {
  console.log('Example app listening on port 3003!');
});