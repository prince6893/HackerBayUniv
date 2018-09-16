var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var User = require('./db/passportConfig');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('./db/dbconfig');
app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({    
  extended: true
}));
app.use(passport.initialize());
app.post('/user/signup', function (req, res) {
//console.log(req);
if(!req.body.email || !req.body.password){
  res.status(400);
res.send({message:'Please enter valid credentials'});
}
bcrypt.genSalt(10, function (err, salt) {
  if (err) {
    return next(err);
  }
  bcrypt.hash(req.body.password, salt, function(err, hash) {
    if (err) {
      return next(err);
    }
    var password = hash;
    var newUser = User.build({
      email:req.body.email,
      password: password
    });
    newUser.save().then(function(success){
      console.log('success: ', success);
      const token = jwt.sign(
        { id: success.dataValues.id },
        "winterIsComing",
        { expiresIn: 300000 }
      );

      return res.status(200).json({
        success: true,
        session: token
      });
    }).catch(function(err){
      console.log('err: ', err);
      res.status(400);
      res.send({message:'Email already exists'});
    })
  });
});
});

app.post('/user/login',(req, res, next) => {
  console.log("In Login Request !");
  passport.authenticate(
    "local",
    {
      session: false
    },
    (err, user, info) => {
      if (err) {
        return res.status(500).json({ success: false, errorMessage: err });
      }
      if (!user) return res.status(500).json({ success: false, errorMessage: info });

      return res.status(200).json({ success: true, token: user.token });
    }
  )(req, res, next);
});

app.listen(3003, function () {
  console.log('Example app listening on port 3003!');
});