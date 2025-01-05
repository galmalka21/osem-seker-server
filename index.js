const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const https = require('https');
const app = express();
const generalRoute = require('./routes/general')
const cookieParser = require('cookie-parser');
const websocket = require('./middleware/websocket');
const port = 3000;

const corsOptions = {
    origin: ['https://witty-rock-00b5d0803.4.azurestaticapps.net' , 'http://localhost:5173'], // Specify the exact origin
    methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'HEAD'], // Allow these methods
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization' , 'ngrok-skip-browser-warning'], // Specify headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions)); // Apply CORS middleware
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/general', generalRoute)

const server = http.createServer(app);

websocket(server);

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});