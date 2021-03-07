const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const Shoe = require('./models/Shoe');
const User = require('./models/User');

mongoose.connect('mongodb://localhost/reactApp', {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on('connected', () => {
    console.log('Connected to DB successfully!');
})


app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.listen(port, console.log(`Server is listening on port ${port}...`));

app.get('/', (req,res) => {
    res.redirect('/api');
})

app.get('/api/users',async (req,res) => {
    const allUsers = await User.find({});

   res.json(allUsers);
    
})

app.get('/api/shoes', (req,res) => {

    Shoe.find({})
    .then((response) => {
        res.json(response);
    })
})

app.post('/save/user', async (req,res) => {
    console.log("BODY: ", req.body);

    const newUser = new User(req.body);

    await newUser.save();
})


