const express = require('express');
const router  = express.Router();

const auth = require('../middleware/auth.js');



//home page
router.get('/', (req,res)=>{


    res.render('welcome');
});
router.get('/restrictedpage',(req,res)=>{


    res.render('restrictedpage');
})



module.exports = router;