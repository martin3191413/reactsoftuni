const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

 async function register(data){

    const user = await User.findOne({username: data.username});

    if (user){
        throw new Error('This email address is already in use!');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);

    const newUser = new User({username: data.username,password: hash});

    await newUser.save();
}

async function login(data){
    const user = await User.findOne({username: data.username});

    
    if (!user){
        throw new Error('Wrong username or password!');
    }

    const isValid = await bcrypt.compare(data.password, user.password);

    if (!isValid){
        throw new Error('Wrong username or password!');
    }

    const token = jwt.sign({id: user._id, email: data.username}, 'mySecretSecret');

    return token;
}

module.exports = {
    register,
    login
}