const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
const cors = require('cors');

const  JWT_SECRET = 'kumbajallow';

//login routes
module.exports = async function authRoutes(app){
    app.post('/api/auth/login', async (req, res)=>{
        const {username, password} = req.body;
        try{
            const user = await User.findOne({username});
            if(!user){
                res.status(400).json({message: 'Invalid Username!'});
            }
            const isMatch = await user.comparePassword(password);
            if(!isMatch){
                res.status(500).json({message:'Invalid password'})
            }
            const token = jwt.sign({userId: user._id, role: user.role}, JWT_SECRET);
            res.json({token, role: user.role});
        }
        catch(err){
            res.status(500).json({message: 'Server error!'});
        }
    }); 
    
    //signup route
    app.post('/api/auth/signup', async (req, res)=>{
        const {username, password, role} = req.body;    
        try{
            const userExists = await User.findOne({username});
            if(userExists){
                return res.status(400).json({message: 'Username already exists!'});
            }
            //create a new user if the username is not taken
            const user = new User({
                username: username,
                password: password,
                role: role
            });
            await user.save();
            //get the token
            const token = jwt.sign({userId: user._id, role: user.role}, JWT_SECRET);
            res.json({token, role: user.role})
        }
        catch(err){
            console.error('Error signing up: ', err)
            res.status(500).json({message: 'Server error!'})
        }
    })
}

