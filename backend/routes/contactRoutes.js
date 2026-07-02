// routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel'); // Replace with actual contact model

// Handle POST requests to create a new contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).json({ message: 'Message sent successfully', contact: newContact });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});




router.get('/', async (req, res) => {
  const messages = await Contact.find();
  res.json(messages);
});

module.exports = router;
