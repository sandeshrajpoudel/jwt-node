const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
//hashing password
const bcrypt =require('bcrypt');
//jwt creating token
const jwt = require("jsonwebtoken");


//hashing password 
  // const passwordhash =await bcrypt.hash(password, 8);


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
    const token = userReg.generateAuthToken();
    
     const registered = await userReg.save();
     res.status(201).render("login") 
     console.log('saved'); 

     
} catch (error) {
    console.log('bbb')
    res.sendStatus(400).json({message:'error message'})

}
  

          

    
});

    
router.post('/login',async (req,res,next)=>{
    try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(`${email}, ${password}`);
    const useremail= await User.findOne({
            email:email
    //lhs= database const & rhs = from ejs username field
        });
        //getting password of respective user email acc
        //(useremail.password);

        const ismatch = bcrypt.compare(password, usermail.password);

         //using middleware
    const token = useremail.generateAuthToken();
        console.log(token);
        if(ismatch){
            res.status(201).send('you are logged in')
        }else{
            res.send('Email or password are not matching');
        }


        
    } catch (error) {
        res.sendStatus(400).json({message:'error message'})
    }




  });


//logout
router.get('/logout',(req,res)=>{


 });




module.exports  = router;



// const createtoken =async ()=>{
//     const token =await jwt.sign({_id:"123"},"",
//     {expiresIn:"2 minutes"

//     });
//     const verifyuser =jwt.verify(token,"")
// }

// createtoken();