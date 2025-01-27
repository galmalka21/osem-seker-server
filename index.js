const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const https = require('https')
const generalRoute = require('./routes/general');
const cookieParser = require('cookie-parser');
const websocket = require('./middleware/websocket');
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });


// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({credentials: true , origin: [true, "https://witty-rock-00b5d0803.4.azurestaticapps.net"]}));

app.use('/general', generalRoute);

// Initialize WebSocket middleware


app.get('/' , (req ,res)=> {
    return res.status(200).send("OK")
})

const host = '0.0.0.0'; // Bind to all available IPs
const server = app.listen(port , host, async () => {
    console.log("Server running on port", port);
})

websocket(server);