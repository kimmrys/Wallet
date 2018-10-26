const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
var cookieParser = require('cookie-parser');






const accountRouter = require('./server/routers/accountRouter');
// const balanceRouter = require('./server/routers/balanceRouter');
const transferRouter = require('./server/routers/transferRouter');
const depositRouter = require('./server/routers/depositRouter');
const withdrawRouter = require('./server/routers/withdrawRouter');
const historyRouter = require('./server/routers/historyRouter');
const billsRouter = require('./server/routers/billsRouter');

const accountAPI = require('./server/api/accountAPI');
const transferAPI = require('./server/api/transferAPI');
const depositAPI = require('./server/api/depositAPI');
const withdrawAPI = require('./server/api/withdrawAPI');
const historyAPI = require('./server/api/historyAPI');
const billsAPI = require('./server/api/billsAPI');

const PORT = 3300;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.get('/setcookie', function(req,res){
    res.cookie('account_number', '1000', { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
    return res.send('Cookie has been set');
});

// app.post('/getcookie', function(req, res) {
//     var username = req.cookies['account_number'];
//     if (username) {
//         return res.send(username);        
//     }
//     return res.send('No cookie found');
// });

// app.use((req,res,next) => {
//     if(req.method == "POST"){
//         let account_number = req.cookies['account_number'];
//         if(account_number != '1000'){
//             res.send('Forbidden access..');
//         }
//     }
//     next();
// });


app.use('/', accountRouter);
// app.use('/balance', balanceRouter);
app.use('/transfer', transferRouter);
app.use('/deposit', depositRouter);
app.use('/withdraw', withdrawRouter);
app.use('/history', historyRouter);
app.use('/bills', billsRouter);

app.use('/api',accountAPI);
app.use('/api/transfer', transferAPI);
app.use('/api/deposit', depositAPI);
app.use('/api/withdraw', withdrawAPI);
app.use('/api/history', historyAPI);
app.use('/api/bills', billsAPI);



app.use(express.static('public'));

// NOTE: The __dirname is important for setting up the directory of the views
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');

app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}!`);
})
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
