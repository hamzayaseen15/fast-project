const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complain');
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');



// Route to create a new complaint
router.post('/addcomplaints', [
  body('title', 'Enter a valid name').isLength({ min: 3 }),
  body('description', 'Description should be of 5 characters').isLength({ min: 5 })

], fetchuser, async (req, res) => {
  try {
    const { title, description, category, status } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const complaint = new Complaint({ title, description, category, status, user: req.user.id });
    const savedComplaint = await complaint.save()
    res.status(200).json(savedComplaint);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Route to get all complaints
router.get('/fetchcomplaints', fetchuser, async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id });
    res.json(complaints);
  } catch (err) {
    console.log(err.message)
    res.status(500).send(err.message);
  }
});

router.put('/updatecomplain/:id', fetchuser, async (req, res) => {
  try {
    const { title, description, category, status } = req.body;
    const newComplain = {};
    if(title){newComplain.title = title};
    if(description){newComplain.description = description};
    if(category){newComplain.category = category};
    if(status){newComplain.status = status};

    let complain = await Complaint.findById(req.params.id);
    
    if(!complain){return res.status(404).send("Not Complain Found")}

    if(complain.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed")
    }

    complain = await Complaint.findByIdAndUpdate(req.params.id, {$set: newComplain}, {new: true})
    res.json({complain});
  } catch (err) {
    console.log(err.message)
    res.status(500).send(err.message);
  }
});

module.exports = router;
