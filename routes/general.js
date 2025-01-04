const express = require('express');
const router = express.Router();
const sql = require("../mssql");
const { errors } = require('../utils/error');


router.get('/test' , (req ,res) => {
    return res.status(200).send("OK")
})


router.post('/register' , async (req ,res) => {
    const {username , phone} = req.body
    if(!username || !phone){
        return res.status(200).send({status: false , msg: errors.REGISTER_ERR})
    }

    try {

        const result = await sql.pool
        .request()
        .input('FullName', sql.SQLInst.NVarChar, username) 
        .input('PhoneN', sql.SQLInst.NVarChar, phone)
        .execute('AddUser');
        
        return res.status(200).send({status: true});

    } catch (e) {
        console.log(`Error in route /register` , e);
        return res.status(200).send({status: false , err: errors.SQL_ERROR});
    }
})

router.get('/is_question_active' , async (req ,res) => {
    try {

        const result = await sql.pool
        .request()
        .execute('IsQon');
        console.log(result);
        

        return res.status(200).send({status: true , result: result.recordset});

    } catch (e) {
        console.log(`Error in route /is_question_active` , e);
        return res.status(200).send({status: false , msg: errors.SQL_ERROR});
    }
})


router.get('/get_question' , async (req ,res) => {
    const requestData = req.query
    
    try {

        const result_questions = await sql.pool
        .request()
        .input('QID', sql.SQLInst.Int, requestData.question_id)
        .execute('IsQon');
        console.log(result_questions);
        
        const result_answers = await sql.pool
        .request()
        .input('QID' , sql.SQLInst.Int , requestData.question_id)
        .execute("GetQAnswers")
        console.log(result_answers);

        return res.status(200).send({status: true , question: result_questions.recordset , answsrs: result_answers.recordset});

    } catch (e) {
        console.log(`Error in route /get_question` , e);
        return res.status(200).send({status: false , msg: errors.SQL_ERROR});
    }
})


router.post('/answer_question' , async (req , res) => {
    const {question_id , line , phone} = req.body

    if(!question_id || !line || !phone){
        return res.status(200).send({status: false , err: errors.ANSWER_ERR })
    }

    try {

        const result = await sql.pool
        .request()
        .input('QID', sql.SQLInst.Int, question_id) 
        .input('LineChoosed', sql.SQLInst.Int, line)
        .input('PhoneN', sql.SQLInst.VarChar, phone)
        .execute('InsertUserAns');
        
        return res.status(200).send({status: true});

    } catch (e) {
        console.log(`Error in route /answer_question` , e);
        return res.status(200).send({status: false , err: errors.SQL_ERROR});
    }
})

router.post('/change_question_date' , async (req ,res) => {
    const {question_id , start_date , end_date , token} = req.body

    if(token != "galmalkatoken"){
        return res.status(401)
    }

    try {

        const result = await sql.pool
        .request()
        .input('OnLineQ', sql.SQLInst.Int, question_id) 
        .input('SDate', sql.SQLInst.DateTime, start_date)
        .input('EDate', sql.SQLInst.DateTime, end_date)
        .execute('SetOnLineQTest');
        
        return res.status(200).send({status: true});

    } catch (e) {
        console.log(`Error in route /change_question_date` , e);
        return res.status(200).send({status: false , err: errors.SQL_ERROR});
    }

})


module.exports = router;

