const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const app = express();
const path = require('path')
const sql = require("./mssql");
const generalRoute = require('./routes/general')
const cookieParser = require('cookie-parser');
const websocket = require('./middleware/websocket');
const port = 3000;

app.use(cors({
    origin: ['http://localhost:5173', 'https://witty-rock-00b5d0803.4.azurestaticapps.net/'], // Frontend URL
    credentials: true, // Allow cookies and credentials
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allow necessary HTTP methods
    allowedHeaders: 'Content-Type,Authorization,ngrok-skip-browser-warning', // Allow the 'ngrok-skip-browser-warning' header
}));


app.options('*', cors()); // Handle preflight requests
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/general', generalRoute)

const server = http.createServer(app);

websocket(server);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});