const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const simpleJsonStore = require('simple-json-store');
const accountStore = new simpleJsonStore('accounts.json', {accounts:[]});
const transactionStore = new simpleJsonStore('transactions.json', {transactions:[]});

// 


router.use(bodyParser.json());

router.post('/', (req,res) => {
    let accounts = accountStore.get('accounts');
    let transactions = transactionStore.get('transactions');
    let userAccountNumber;
    let balance;
    // userAccountNumber -> get account number from cookies
    userAccountNumber = req.cookies['account_number'];

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
                "account_number":req.body.recipient,
                "recipient":userAccountNumber,
                "amount":parseInt(req.body.amount),
                "timestamp": Math.floor(new Date().getTime() / 1000)
            }
        )
        transactionStore.set('transactions', transactions);
        res.json(
            { 
                "status":"Transaction complete...",
                "transaction_id":id,
                "account_number":req.body.recipient,
                "recipient":userAccountNumber,
                "amount":parseInt(req.body.amount),
                "timestamp": Math.floor(new Date().getTime() / 1000)
            }
        );
});

module.exports = router;