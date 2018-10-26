const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const simpleJsonStore = require('simple-json-store');
const accountStore = new simpleJsonStore('accounts.json', {accounts:[]});
const transactionStore = new simpleJsonStore('transactions.json', {transactions:[]});



let balance;

router.use(bodyParser.json());

router.post('/', (req,res) => {
    let accounts = accountStore.get('accounts');
    let transactions = transactionStore.get('transactions');
    // userAccountNumber -> get account number from cookies
    let userAccountNumber = req.cookies['account_number'];

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
    balance = input-output;

    // Check if balance is enough for transaction
    if(balance >= req.body.amount){
        // Random ID
        let length = 12;
        let timeStamp = +new Date;

        let _getRandomInt = function(min, max) {
            return Math.floor(Math.random() * (max - min+1)) +min;
        }

        let ts = timeStamp.toString();
        let parts = ts.split("").reverse();
        let id = "";
        
        for(let i = 0; i < length; i++){
            let index = _getRandomInt(0, parts.length - 1);
            id += parts[index];
        }
        transactions.push(
            {
                "transaction_id":id,
                "account_number":userAccountNumber,
                "recipient":req.body.recipient,
                "amount":parseInt(req.body.amount),
                "timestamp": Math.floor(new Date().getTime() / 1000)
            }
        )
        transactionStore.set('transactions', transactions);
        res.json({ "status":"Transaction complete..." });
    }else{
        res.json({"balance":balance});
        // res.send('Not enough balance...');
    }
});

module.exports = router;