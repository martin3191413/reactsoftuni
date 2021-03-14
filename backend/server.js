const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const Shoe = require('./models/Shoe');
const User = require('./models/User');
const authServices = require('./services/authServices');

mongoose.connect('mongodb://localhost/reactApp', {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on('connected', () => {
    console.log('Connected to DB successfully!');
})


app.use(express.json());

app.use(express.urlencoded({extended:false}));


app.listen(port, console.log(`Server is listening on port ${port}...`));

//const newShoe = new Shoe({
   // model: "Asics",
  //  image : "https://github.com/bedimcode/responsive-ecommerce-website-sneakers/blob/master/assets/img/women1.png?raw=true",
   // price: 120,
  //  description: 'Lorem',
 //  category: "Men"
//});

//newShoe.save();

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

    try{
        await authServices.register(req.body);
    }
    catch(err){
        console.log(err);
        res.status(404).send(err.message);
    }
})

app.get('/api/shoes/:shoeId', async (req,res) => {

    console.log("REQ PARAMS:", req.params);

    const currentShoe = await Shoe.findOne({_id: req.params.shoeId});

    res.json(currentShoe);
})

app.get('/api/men', async(req,res) => {

    const allMenShoes = await Shoe.find({category: "Men"});

    res.json(allMenShoes);
})

app.post('/api/login', async (req,res) => {
    console.log("REQ BODY:", req.body);

    try{
        const token = await authServices.login(req.body);

        res.json(token);
    }
    catch(err){
        res.status(404).send({ message: err.message });
    }
})

