const users = require('../models/user');
const jwt = require('jsonwebtoken');


function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
}

// Register a new user
async function register(req, res, next) {
    try{
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const existingUser = await users.findOne({$or: [{email}, {username}]});
        if(existingUser){
            return res.status(409).json({message: "Username or email already in use"});
        }
        const user = await users.create({username, email, password});
        const token = generateToken(user._id);

        res.status(201).json({user: {id: user._id, username: user.username, email: user.email}, token});

    }
    catch(err){
        next(err);
    }
}

// Login a user
async function login(req, res, next) {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Email and password are required"});
        }
        const user = await users.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({message: "Invalid email or password"});
        }
        const token = generateToken(user._id);
        res.status(200).json({user: {id: user._id, username: user.username, email: user.email}, token});

    }
    catch(err){
        next(err);
    }
}

module.exports = {register, login};