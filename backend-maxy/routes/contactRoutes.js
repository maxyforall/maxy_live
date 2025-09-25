const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { validateContactForm } = require('../middleware/validator');
const { sendContactNotification } = require('../utils/emailService');

// @route   POST /api/contact
// @desc    Submit a contact form
// @access  Public
router.post('/create', validateContactForm, async (req, res) => {
  try {
    const { fullname, email, subject, description } = req.body;

    // Create new contact entry
    const newContact = new Contact({
      fullname,
      email,
      subject,
      description
    });

    // Save to database
    const savedContact = await newContact.save();
    
    // Send email notification (non-blocking)
    sendContactNotification(savedContact).catch(err => 
      console.error('Failed to send email notification:', err)
    );
    
    res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      data: savedContact
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error, please try again later'
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contact submissions (could be protected in production)
// @access  Private (in production)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error, please try again later'
    });
  }
});

// @route   DELETE /api/contact/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Contact entry not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact entry deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting contact entry:', error);
    res.status(500).json({
      success: false,
      message: 'Server error, please try again later',
    });
  }
});


module.exports = router; 