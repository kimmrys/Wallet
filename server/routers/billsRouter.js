const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

router.get('/', (req, res) =>{

   let viewModel = req.viewModel;
    res.render('bills.pug', viewModel);
});


router.post('/', (req,res) =>{
    res.redirect('/');
});

module.exports = router;