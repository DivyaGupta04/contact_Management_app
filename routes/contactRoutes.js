const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');


//Home
router.get('/', async (req, res) => {
    const contacts = await Contact.find();
    // res.render('index', { contacts });
    res.render('index', { contacts, 'text': "" });
});

//Add Contact form API
router.get('/add', (req, res) => res.render('add'));

//Add Contact API
router.post('/add', async (req, res) => {
    try {
        const { FirstName, LastName, Address, Email, Phone } = req.body;

        console.log("Recieved data", req.body);

        const newContact = new Contact({ FirstName, LastName, Address, Email, Phone });
        await newContact.save();
        res.redirect('/');
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).send('Error saving contact' + error.message);
    }
});

//Edit form API
router.get('/edit/:id', async (req, res) => {
    try {
    const contact = await Contact.findById(req.params.id);
    res.render('edit', { contact });
    } catch (error) {
        res.status(500).send('Error retrieving contact for edit: ');
    }
});

//Update Contact API
router.post('/edit/:id', async (req, res) => {
    const { FirstName, LastName, Address, Email, Phone } = req.body;
    try {
        await Contact.findByIdAndUpdate(req.params.id, {
            FirstName,
            LastName,
            Address,
            Email,
            Phone
        });
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error updating contact: ');
    }
});

//Delete Contact API
router.get('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Contact.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).send('Error deleting contact' + error.message);
    }
});

module.exports = router;