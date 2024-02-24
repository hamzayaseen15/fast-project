const express = require('express');
const Users = require('../models/Users')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { body, validationResult } = require('express-validator');
const JWT_SECRET = 'RS@%235'
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

    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })

      const data = {
        user:{
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({authToken})
      console.log(authToken)

    }catch(error){
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
});
module.exports = router;
