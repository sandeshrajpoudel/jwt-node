const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
//hashing password
const bcrypt =require('bcrypt');
//jwt creating token
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth.js');
const cookieParser = require('cookie-parser');
const { check } = require('express-validator');




//hashing password 
  // const passwordhash =await bcrypt.hash(password, 8);

  router.get('/admin',auth,(req,res)=>{
    res.render('admin');
});

//login handle
router.get('/login',(req,res)=>{
    res.render('login');
});
router.get('/register',(req,res)=>{
    
    res.render('register');
    });
   
//Register handle
router.post('/register',async (req,res)=>{
try {
     const userReg = new User({
         name : req.body.name,
         email : req.body.email,
         password : req.body.password
         
         
     });
     console.log('aaa');
     //password hashing
     //using middleware
    const token = await userReg.generateAuthToken();
    console.log('i m here');

    res.cookie("jwt",token)
    // {
    //     //also can expire this cookei after some time
    //   // expires:new Date(Date.now()+4000000000000),
    //     httpOnly:true,
    //     //secure:true,
        
    // });
    console.log("now i m down here");
   // console.log("this is the cookie"+cookie);

    
     const registered = await userReg.save();
    
     res.status(201).render("login") 

} catch (error) {
    console.log('u r catched'); 

    //res.sendStatus(400).json({message:'error message'})
}   
});

    
router.post('/login',async (req,res,next)=>{
    try {
      const Email=req.body.email;
     const  Password = req.body.password;


   
    const useremail= await User.findOne({
            email:Email
    //lhs= database const & rhs = from ejs username field
        });
        //getting password of respective user email acc
        //(useremail.password);
        console.log('before hashing password ')

        const token =await  useremail.generateAuthToken();
        //storing jwt token in cookies  while log in post
        res.cookie("jwt",token,{
         //also can expire this cookei after some time
        // expires:new Date(Date.now()+4000000000000),
          httpOnly:true,
        // secure:true
          });

         //using middleware
         console.log('now');
         const ismatch =await bcrypt.compare(Password, useremail.password)
         console.log('after hashing');

        if(ismatch){
            console.log('inside ismatch')
           
              //getting cookies
              //req.cookies.jwt;

            res.redirect("restrictedpage")

           // res.status(201).send('you are logged in')
        }else{
            res.send('Email or password are not matching');
        }


        
    } catch (error) {
        console.log('catched error ')
      //  res.sendStatus(400).json({message:'error message'})
    }




  });


//logout
router.get('/logout',auth, async(req,res)=>{
try {
  //single device logout
  //req.user.tokens = req.user.tokens.filter((currentEl)=>{
   // return currentEl.token===req.token;
 // });


 //logout from all devices
  req.user.tokens=[];
  res.clearCookie("jwt");
  await req.user.save();

  console.log('logged out');
  req.render("welcome");
  
} catch (error) {
  res.status(500).send(error);
}

 });




module.exports  = router;



// const createtoken =async ()=>{
//     const token =await jwt.sign({_id:"123"},"",
//     {expiresIn:"2 minutes"

//     });
//     const verifyuser =jwt.verify(token,"")
// }

// createtoken();