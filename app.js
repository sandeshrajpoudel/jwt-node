const dotenv = require('dotenv').config();
const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
//aaaa
//flashing messages
//const session = require('express-session');
//const flash = require('connect-flash');
//mongoose
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,  
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology : true
})
const db = mongoose.connection;

db.on('error',function(error){
    console.error(error)
});
db.once('open',function(error){
    console.log("connected to database")
});
//EJS
app.set('view engine','ejs');
//app.use(expressEjsLayout);
//BodyParser
app.use(express.json());
app.use(express.urlencoded({extended:false}));



//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/routing'));


//generate a port automatically
const port = process.env.PORT || 8080;

//app.listen(8080)
app.listen(port, ()=>{
console.log('server is running at ' + port +' '+ 'successfully');
});
