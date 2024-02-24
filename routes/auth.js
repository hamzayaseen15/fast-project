const express = require('express');
const Users = require('../models/Users')
const router = express.Router();
const { body, validationResult } = require('express-validator');

//create a user using POST "/api/auth"
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password should be of 5 characters').isLength({min: 5}),

], async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    let user = await Users.findOne({email: req.body.email})
    if(user){

      return res.status(400).json({error: "Sorry a user with email already exist"})
    }
    user = await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      res.json({user})
    }catch(error){
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
});
module.exports = router;
