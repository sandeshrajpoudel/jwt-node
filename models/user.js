const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



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
    const Token =await jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY,
       {expiresIn:"2 months"});
       this.tokens=this.tokens.concat({token:Token})
      await this.save();
       return token;
    
} catch (error) {
    resizeBy.send('error'+error);
    
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