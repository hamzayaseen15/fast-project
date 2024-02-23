const express = require('express');
const Users = require('../models/Users')
const router = express.Router();



//create a user using POST "/api/auth"
router.post('/', (req,res)=>{
    console.log(req.body)
    const user = Users(req.body)
    user.save()
    res.send("hello")
})
module.exports = router;
