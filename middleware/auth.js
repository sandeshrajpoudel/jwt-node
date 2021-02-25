const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const auth = async(req,res,next)=>{
    try {
        const getToken = req.cookies.jwt;
        const verifyUser = jwt.verify(token,process.env.SECRET_KEY)
        
        const user = await User.findOne({_id:verifyUser._id}) 

        req.token =getToken;
        req.user=user;
        next();
    } catch (error) {
        console.log('catched in auth')
        res.status(401).send(error);
    }
}


module.exports =auth;
