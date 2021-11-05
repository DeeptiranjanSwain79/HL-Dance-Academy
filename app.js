const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 800;
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const internal = require('stream');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});

//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    aadhaar: String,
    email: String,
    phone: String,
    address: String
});

const Contact = mongoose.model('Contact', contactSchema);


//Express Specific Stuffs
app.use('/static', express.static('static'));   //For serving static files
app.use(express.urlencoded())

//Pug specific Stuffs
app.set('view engine', 'pug')   //Set the template engine as PUG
app.set('views', path.join(__dirname, 'views'))     //Set the views directory

//End-points
app.get('/', (req, res)=>{
    const params = {};
    // res.status(200).render('index.pug', params);
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res)=>{
    const params = {};
    res.status(200).render('contact.pug', params);
});
app.get('/about', (req, res)=>{
    const params = {};
    res.status(200).render('about.pug', params);
});

app.get('/class', (req, res)=>{
    const params = {};
    res.status(200).render('class.pug', params);
});

app.get('/services', (req, res)=>{
    const params = {};
    res.status(200).render('services.pug', params);
});



app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });

    res.status(200).render('contact.pug');
});


// app.post('/contact', (req, res)=>{
//     // console.log(req.body);
//     name = req.body.name;
//     email = req.body.email;
//     age = req.body.age;
//     gender = req.body.gender;
//     address = req.body.address;
//     aadhaar = req.body.aadhaar;

//     let client = `Name of client is ${name}, having email address: ${email}, AADHAAR no ${aadhaar} \n${gender} of ${age}, residing at ${address}. `;
//     fs.writeFileSync(`${aadhaar}.txt`, client)
//     const params = {'message': 'Your form has submitted successfully'};
//     res.status(200).render('index.pug',params);
// });

//Starting the server
app.listen(port, ()=>{
    console.log(`Application started successfully at port ${port}`);
})