const express = require('express');
const Users = require('../models/Users')
const router = express.Router();
const { body, validationResult } = require('express-validator');




//create a user using POST "/api/auth"
router.post('/', [
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password should be of 5 characters').isLength({min: 5}),

], (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    Users.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user));

});
module.exports = router;
