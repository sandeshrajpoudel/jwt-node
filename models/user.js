const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");



const UserSchema  = new mongoose.Schema({
  name :{
      type  : String,
      required : true
  } ,
  email :{
    type  : String,
    required : true
} ,
password :{
    type  : String,
    required : true
} ,
date :{
    type : Date,
    default : Date.now
},
roles:{
    type: String,
    required: true,
    default:"USER",
    enum: ["USER", "ADMIN"]
}
,
tokens:[{
    token:{
        type  : String,
        required : true
        
    }

}]
});
//generating tokens
UserSchema.methods.generateAuthToken = async function(){

    try {
        console.log('inside try'); 
        console.log(this._id); 


    const token =await jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
    console.log('after secret key'); 

    this.tokens = this.tokens.concat({token:token})
/////error is down here
      await this.save();
      console.log(token); 

      
      return token;

    
} catch (error) {
    console.log('hello error');
   // resizeBy.send('error'+error);
    
}

}

//cant use arrow function
//middleware

UserSchema.pre("save",async function(next){
    if(this.isModified("password")){  
    this.password=await bcrypt.hash(this.password,8);
        console.log('middleware working well');
}
next();
});


const User= mongoose.model('User',UserSchema);

module.exports = User;