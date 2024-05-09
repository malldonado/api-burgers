//imports
const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();
dotenv.config();

// Middleware to receive data in the request body
app.use(cors());
app.use(express.json()); // receive JSON data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
readdirSync('./routes/').map((r) => app.use('/', require('./routes/' + r)));

// Middleware to allow access from the frontend
app.use(cors({ origin: "http://localhost:3000" }));

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> {
    console.log('Server is running on port 8000');
});