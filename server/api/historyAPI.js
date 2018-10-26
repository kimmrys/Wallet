const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const simpleJsonStore = require('simple-json-store');


const transactionStore = new simpleJsonStore('transactions.json', {transactions:[]});





router.use(bodyParser.json());

router.post('/', (req,res) => {
    let userAccountNumber;
    let transactionHistory = [];
    let transactions = transactionStore.get('transactions');
    
    userAccountNumber = req.cookies['account_number'];
    if(!userAccountNumber){
        res.send('Account not found!')
    }

    userAccountNumber = req.cookies['account_number'];

// Check balance
    let input = 0;
    let output = 0;

    transactions.forEach(transaction => {
        if(transaction.account_number === userAccountNumber){
            transactionHistory.push(transaction);
        }else if(transaction.recipient === userAccountNumber){
            transactionHistory.push(transaction);
        }
    })
    res.json(transactionHistory);
});

module.exports = router;