// SQL tutorial 6:32 using inputs https://www.youtube.com/watch?v=W3VZt8OkDX0&ab_channel=QABoxLet%27sTest
//TODO:
// - Should be a module.
// - should i connect it allways, or should i connect on every query.

var sql = require("mssql");
require('dotenv').config();
const config = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: JSON.parse(process.env.DB_PORT),
    database: process.env.DB_NAME,
    requestTimeout: 3600000, //an hour
    options: {
        trustedConnection: true,
        trustServerCertificate: true
    },
    debug: true,
    parseJSON: true
}

let pool;

const initConnect = async () => {
    try {
        const pool = await sql.connect(config);
        return pool;
    } catch (err) {
        console.log(err.message);
        sql.close()
    }
}

const initMod = async () => {
    this.pool = await initConnect();
    console.log("open connecion")
}

initMod()

module.exports.pool = pool;
module.exports.SQLInst = sql;