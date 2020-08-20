'use strict';
const express = require('express');
const { Router } = require('express');
const cart = express.Router();
let nextID = 5;
let myCart = [
    {id: 1, product: 'Cheeseburger', price: 8.50, quantity: 1},
    {id: 2, product: 'Onion Rings', price: 5.50, quantity: 3},
    {id: 3, product: 'Pepsi', price: 2.75 , quantity: 1},
    {id: 4, product: 'Boneless Wings', price: 7.00, quantity: 5},
]

cart.get('/', (req, res)=>{
    res.json(myCart);
})
cart.get('/paged',(req, res)=>{
    if(req.query.size){
        const size = parseInt(req.query.size);
        if(size <= myCart.length){
            res.json(myCart);
        } else {
            res.json(myCart.slice(0,size-1))
        }
    }
})
cart.get('/:id', (req, res)=>{
    let item = myCart.find((snack)=>snack.id === parseInt(req.params.id)) //parseInt to convert item to number
    if(!item){
        res.status(404).send('Nothing here');         //if item not found
    }
    res.status(200).json(item);   //if item found (set to 200 automatically) res.status(number) if spe
})                 

cart.post('/', (req, res)=>{
    if(req.body && req.body.product && req.body.price && req.body.quantity){
        const newSnack = {
            id: nextID,
            product:req.body.product,
            price:req.body.price,
            quantity:req.body.quantity
        }
        nextID++;
        myCart.push(newSnack);
        res.status(201).json(newSnack);
    } else {
        res.sendStatus(400);
    }
})

cart.put('/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const newSnack = {
        id,
        product:req.body.product,
        price:req.body.price,
        quantity:req.body.quantity
    }
    let oldSnack = snackItems.findIndex((snack)=>snack.id === id);
    snackItems[oldSnackIndex] = updatedSnack;
    res.json(updatedSnack);
})

cart.delete('/:id', (req, res)=> {
    //let oldSnack = myCart.findIndex((snack)=>snack.id === id);
    let index = myCart.find((snack)=> snack.id === parseInt(req.params.id));
    let snackIndex = myCart.indexOf(index);
    myCart.splice(snackIndex,1);
    res.sendStatus(204); //having trouble getting the item to remove without refreshing the page
})

module.exports = cart;