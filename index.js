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

