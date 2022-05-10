const express = require('express');
const router= express.Router();


const {userById  } = require('../controllers/user');
const {isAuth  } = require('../controllers/auth')
const { tokenMiddleware } = require('../middleware/tokenMiddleware');

router.get("/secret/:userId" , tokenMiddleware ,isAuth,(req,res)=>{
    res.json({
        user:req.profile
    })
    console.log(res.profile)
})

router.param('userId',userById)

module.exports = router;