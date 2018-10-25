const express = require('express');
const bodyParser = require('body-parser');
const simpleJsonStore = require('simple-json-store');
const PORT = 3000;

const app = express();

app.use(bodyParser.json());

let accountStore = new simpleJsonStore('accounts.json', {accounts:[]});
let transactionStore = new simpleJsonStore('transaction.json', {transaction:[]})

// app.use((req, res,next) => {
    // if(req.body.account_number != "1000"){
    //     res.send("Forbidden access...");
    // }
    // else{
    //     next();
    // }
// })


app.post('/balance',(req,res) => {
    let accounts = accountStore.get('accounts');
    let account = accounts.find(accounts => accounts.account_number === req.body.account_number);
    let input = 0;
    let output = 0;
    account.transactions.forEach(transaction => {
       
        if(transaction.receiver === req.body.account_number){
            input += transaction.amount
        }else{
            output += transaction.amount
        }
    });
    res.json({"balance":input - output});
});

app.post('/transactions',(req,res) => {
    let accounts = accountStore.get('accounts');
    let account = accounts.find(accounts => accounts.account_number === req.body.account);
    res.json({"transaction_history":account.transactions});
});

app.post('/deposit', (req, res) => {
    let transaction_id = req.body.transaction_id;
    let sender = req.body.sender;
    let account_number = req.body.account_number;
    let amount = req.body.amount;
    
    let accounts = accountStore.get('accounts');
    for(let i = 0; i < accounts.length; i++ ){
        if(accounts[i].account_number === account_number){
            accounts[i].transaction.push(
                {
                    "transaction_id":transaction_id,
                    "sender":sender,
                    "account_number":account_number,
                    "amount":amount
                }
            );
            break;
        }
    }
    accountStore.set('accounts',accounts);
});


app.post('/withdraw', (req,res) => {
    
    let accounts = accountStore.get('accounts');
    let account = accounts.find(accounts => accounts.account_number === req.body.user_account_number);
    let input = 0;
    let output = 0;
    account.transactions.forEach(transaction => {
       
        if(transaction.receiver === req.body.user_account_number){
            input += transaction.amount
        }else{
            output += transaction.amount
        }
    });
    let balance = input-output;

    if(balance >= req.body.amount){
        let transaction_id = req.body.transaction_id;
        let sender = req.body.sender;
        let account_number = req.body.account_number;
        let amount = req.body.amount;
        
        let accounts = accountStore.get('accounts');
        for(let i = 0; i < accounts.length; i++ ){
            if(accounts[i].account_number === account_number){
                accounts[i].transaction.push(
                    {
                        "transaction_id":transaction_id,
                        "sender":sender,
                        "account_number":account_number,
                        "amount":amount
                    }
                );
                break;
            }
        }
        accountStore.set('accounts',accounts);
    }else{
        res.json({ "error":"Not enough balance" });
    }
})

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}!`);
})