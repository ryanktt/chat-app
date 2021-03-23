const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const path = require('path');

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.render('index');
});


const port = process.env.PORT;
app.listen(port); 
console.log(`running on port ${port}`);