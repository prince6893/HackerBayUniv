const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sequelize = require("./dbconfig");

const User = sequelize.import("./Users");
sequelize.sync().then(function(){

});
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    ( req,email, password, done) => {
      User.findOne({ where: { email } })
        .then(user => {
          if (!user) {
            return done(null, false, "Error : User doesn't exist.");
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) {
              return done(null, false, "Error : Invalid password.");
            }
            if (isMatch) {
              const token = jwt.sign({ id: user.id }, "winterIsComing", {
                expiresIn: 3000000
              });
              return done(null, { token });
            }
          });
        })
        .catch(err => console.log("DataBase error ==== ",err));
    }
  )
);
module.exports = User;