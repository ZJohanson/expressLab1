'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const cors = require('cors');
let cart = require('./cart');

app.use(express.json()); //must be before
app.use(cors());
app.use('/cart-items', cart); //this
app.get('*',(req,res)=>{
    res.json({message:'Ah ah ah, you didnt say the magic word'});
})

app.listen(port, ()=>{console.log(`server listening on port ${port}`)});
