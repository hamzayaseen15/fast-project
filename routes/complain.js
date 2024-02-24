const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complain');

// Route to create a new complaint
router.post('/complaints', async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const complaint = new Complaint({ title, description, category });
    await complaint.save();
    res.status(201).send(complaint);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Route to get all complaints
router.get('/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.send(complaints);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
