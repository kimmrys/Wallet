const express = require('express');
const bodyParser = require('body-parser');
const simpleJsonStore = require('simple-json-store');
const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.post('/api/deposit', (req, res) =>{
    let transaction_id = req.body.transaction_id;
    let sender = req.body.sender;
    let account_number = req.body.account_number;
    let amount = req.body.amount;
    app.post('')

});