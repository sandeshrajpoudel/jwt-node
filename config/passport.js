const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require("../models/user");


//function(passport) {

//}

    passport.use(
        new LocalStrategy({usernameField : 'email'},{usernameField : 'password'},
        (email,password,done)=> {
                //match user
                User.findOne({email : email})
                .then((user)=>{
                    console.log("hello 123")
                 if(!user) {
                     return done(null,false,{message : 'that email is not registered'});
                 }
                 //match pass
                 bcrypt.compare(password,user.password,(err,found)=>{
                     if(err) throw err;

                     if(found) {
                         return done(null,user);
                     } else {
                         return done(null,false,{message : 'pass incorrect'});
                     }
                 })
                })
                .catch((err)=> {console.log(err)})
        })
        
    )
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      }); 
 

module.exports = passport;