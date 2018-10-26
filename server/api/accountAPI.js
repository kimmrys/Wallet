const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const simpleJsonStore = require('simple-json-store');

const accountStore = new simpleJsonStore('accounts.json', {accounts:[]});
const transactionStore = new simpleJsonStore('transactions.json', {transactions:[]});

let accounts = accountStore.get('accounts');

let userAccountNumber;

router.use(bodyParser.json());

router.post('/', (req,res) => {
    let transactions = transactionStore.get('transactions');
    
    userAccountNumber = req.cookies['account_number'];
    if(!userAccountNumber){
        res.send('Account not found!')
    }
    let accountJSON;

    userAccountNumber = req.cookies['account_number'];

// Check balance
    let input = 0;
    let output = 0;

    transactions.forEach(transaction => {
        if(transaction.account_number === userAccountNumber){
            output += transaction.amount;
        }else if(transaction.recipient === userAccountNumber){
            input += transaction.amount;
        }
    })
    let balance = input-output;

    accounts.forEach(account => {
        
        if(account.account_number === userAccountNumber){
            accountJSON = 
            {
                "account_number":userAccountNumber,
                "account_name":account.account_name,
                "balance":balance
            };
        }
    });
    res.json(accountJSON)

});

module.exports = router;