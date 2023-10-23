const express = require("express");
const path = require("path");
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
// const bodyparser = require("body-parser");   //it is a middleware but not Require

mongoose.connect('mongodb://localhost/contactDance');
const port = 80;

//   define mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

const Contact = mongoose.model('Contact', contactSchema);  

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'template')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const pro = {}
    res.status(200).render('home.pug', pro);
});

app.get('/contact', (req, res)=>{
    const pro = {}
    res.status(200).render('contact.pug', pro);
});

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(404).send("Item was not saved to the database")
    })
    // res.status(200).render('contact.pug');
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port http://localhost:${port}`);
});

// app.post('/contact', (req,res)=>{
//     name=req.body.name
//     phone=req.body.phone
//     email=req.body.email
//     address=req.body.address
//     desc=req.body.desc
    
//     let outputTowrite = `The name of the student is ${name}, ${phone} year old, ${email}, residing at ${address}, more about him/her: ${desc}`
//     fs.writeFileSync('output.txt', outputTowrite)
//     const pro = {'message': 'Successfully Submitted'}
//     res.status(200).render('index.pug', pro);
// })


//  www.Expressjs.com
//  www.pug.org
//  www.pug tamplates.com

// npm init
// npm install express
// npm i pug
// npm i mongoose  // for sending data in database

//to run this file - 
// first "mongod" should run on "powershell"
// then run "node app.js" in terminal