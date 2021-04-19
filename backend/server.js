const express = require('express');
const app = express();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 5000;
const Shoe = require('./models/Shoe');
const Order = require('./models/Order');
const User = require('./models/User');
const authServices = require('./services/authServices');

const stripe = require('stripe')('sk_test_51IaKmoGtpROy8rrpRPpQuxX4QQV5G6TSXSotbvatxAA2guxRM5VRv6XrEKvuCMhi575hlYdEZRmCosOJn3D80haQ00rWjf5mZf');

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

   const order = new Order({madeAt: new Date(), items: req.body.cartItems, user: req.body.id, totalMoney: req.body.orderCost, refunded: false, status: 'Completed'});

   await order.save();

   await User.updateOne({_id: req.body.id}, {amountMoney: req.body.money});

   const user = await User.findOne({_id: req.body.id});

   user.orders.push(order);

    await user.save();
    
  res.status(200).json({id: order._id});
});

app.post('/api/orders/:userId', async(req,res) => {

    const userId = req.params.userId;

    const userOrders = await Order.find({}).where('user').equals(userId).lean();

    res.json(userOrders);
})

app.post('/api/orders/refund/:orderId', async(req,res) => {

   try{
       const order = await Order.findOne({_id: req.params.orderId});

       console.log(order);

       const user = await User.findOne({_id: order.user});

       if (order.refunded == true){
           throw new Error('Order has been refunded already!');
       }

        user.refunds = user.refunds - 1;

       user.amountMoney += order.totalMoney;

       await user.save();
       
        order.refunded = true;

        order.status = 'Refunded';

        await order.save();

        res.json('Order refunded successfully!');
   }
   catch(err){
       res.status(405).send(err.message || 'Invalid Order Number!');
   }
})

app.post('/api/stripe-payment', async(req,res) => {

    const {id,amount} = req.body;

    try{
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: 'USD',
            payment_method: id,
            confirm: true
        })

        res.json('Everything went fine!, Order taken!');
    }
    catch(err){
        console.log(err);
    }
})


app.post('/api/email', async (req,res) => {

    const userEmail = req.body.userEmail;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'marto1232a@gmail.com', 
          pass: 'Marto123%',
        }
      });

      let info = {
        from: '"React Project Softuni" <marto1232a@gmail.com>',
        to: userEmail,
        subject: "Order Details Demo",
        text: `Thats your confirmation email about Order N#${req.body.orderId}. Expect shipment details soon! Greetings!`,
        html: `<b>Thats your confirmation email about Order N#${req.body.orderId}. Expect shipment details soon! Greetings!!</b>`, 
      };

      transporter.sendMail(info, function(err,data){
          if (err){
              console.log(err);
          }
          else{
              console.log(data);
          }
      })


})
