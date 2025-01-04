const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path')
const sql = require("./mssql");
const questionsRoute = require('./routes/general')
const cookieParser = require('cookie-parser');
const port = 3000;

app.use(cors({
    origin: ['http://localhost:5173' , 'https://witty-rock-00b5d0803.4.azurestaticapps.net/'], // Frontend URL
    credentials: true, // Allow cookies and credentials
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allow necessary HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allow headers
}));


app.options('*', cors()); // Handle preflight requests
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/general', questionsRoute)

app.listen(process.env.PORT || port, () => console.log(`Hello world app listening on port ${port}!`));
