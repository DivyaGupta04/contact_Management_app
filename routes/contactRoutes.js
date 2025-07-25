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
    const contact = await Contact.findById(req.params.id);
    res.render('edit', { contact });
});

//Update Contact API
router.put('/edit/:id', async (req, res) => {
    await Contact.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
});

//Delete Contact API
router.delete('/delete/:id', async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;