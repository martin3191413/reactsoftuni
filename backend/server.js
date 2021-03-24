const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const Shoe = require('./models/Shoe');
const Order = require('./models/Order');
const User = require('./models/User');
const authServices = require('./services/authServices');

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

    try{
       const newUser =  await authServices.register(req.body);

       res.json(newUser);
    }
    catch(err){
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
        res.status(404).send(err.message);
    }
})

app.get('/api/user/:id', async(req,res) => {
    const user = await User.findOne({_id: req.params.id});
    
        res.json(user);
})

app.post('/api/user/update',async (req,res) => {

   console.log("REQ BODY:", req.body);

   const order = new Order({madeAt: new Date(), items: req.body.cartItems, user: req.body.id, totalMoney: req.body.totalMoney});

    await order.save();


    await User.updateOne({_id: req.body.id}, {amountMoney: req.body.money});

   const user = await User.findOne({_id: req.body.id});

   user.orders.push(order);

    await user.save();
  res.status(200).json('User updated!');
});

app.post('/api/orders/:userId', async(req,res) => {

    const userId = req.params.userId;

    const userOrders = await Order.find({}).where('user').equals(userId).lean();

    res.json(userOrders);
})
