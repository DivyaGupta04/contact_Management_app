const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Contact = require('./models/contact'); 

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://DIVYA:divya@meradb.z2dszqk.mongodb.net/Contact_DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Routes
const contactRoutes = require('./routes/contactRoutes');
app.use('/', contactRoutes);

app.listen(8085);