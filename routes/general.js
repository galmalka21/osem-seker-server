const express = require('express');
const router = express.Router();
const sql = require("../mssql");


router.get('/test' , (req ,res) => {
    return res.status(200).send("OK")
})


module.exports = router;

