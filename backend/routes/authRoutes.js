const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Journalist = require('../models/journalist');
const Student = require('../models/student');
const Admin = require('../models/admin');
const router = express.Router();
const cors = require('cors');

const  JWT_SECRET = process.env.JWT_SECRET_CODE; 

//login routes
module.exports = async function authRoutes(app){
    app.post('/api/auth/login', async (req, res)=>{
        const {username, password, role} = req.body;
        try{
            let user;
            if(role == 'student'){
                user = await Student.findOne({username});
            }
            else if(role == 'admin'){
                user = await Admin.findOne({username});
            }
            else if(role == 'journalist'){
                user = await Journalist.findOne({username});
            }
            else{
                return alert('Unknown user! Access denied');
            }
            if(!user){
                return res.json({message: 'Invalid Username!'});
            }
            const isMatch = await user.comparePassword(password);
            console.log('isMatch isA: ' + isMatch); //tester
            if(!isMatch){
                return res.json({message:'Invalid password'})
            } 
            const token = jwt.sign({userId: user._id, role: user.role}, JWT_SECRET);
            res.json({token, role: user.role});
        }
        catch(err){
            res.json({message: 'Server error!', result: err});
        } 
    }); 
    
    //signup route
    app.post('/api/auth/signup', async (req, res)=>{
        const {username, password, role} = req.body;    
        try{
            let userExists;  // = await User.findOne({username});
            if(role == 'student'){
                userExists = await Student.findOne({username});
                if(userExists){
                    return res.json({message: 'Username already exists!'});
                }

                //create a new user if the username is not taken
                const user = new Student({
                username: username,
                password: await bcrypt.hash(password, 10),
                role: role
                });
                await user.save();
                //get the token
                const token = jwt.sign({userId: user._id, role: user.role}, JWT_SECRET);
                res.json({token, role: user.role});
            }
            else if(role == 'admin'){
                userExists = await Admin.findOne({username});
                if(userExists){
                    return res.json({message: 'Username already exists!'});
                }
                //create a new user if the username is not taken
                const user = new Admin({
                username: username,
                password: await bcrypt.hash(password, 10),
                role: role
                });
                await user.save();
                //get the token
                const token = jwt.sign({userId: user._id, role: user.role}, JWT_SECRET);
                res.json({token, role: user.role});
            }
            else if(role == 'journalist'){
                userExists = await Journalist.findOne({username});
                if(userExists){
                    return res.json({message: 'Username already exists!'});
                }
                //create a new user if the username is not taken
                const user = new Journalist({
                username: username,
                password: await bcrypt.hash(password, 10),
                role: role
                });
                await user.save();
                //get the token
                const token = jwt.sign({userId: user._id, role: user.role}, JWT_SECRET);
                res.json({token, role: user.role});
            }
            else{
                res.json({message: 'No role selected! Error signing up!'})
                return alert('Choose a role...');
            }
        }catch(err){
            console.error('Error signing up: ', err)
            res.json({message: 'Server error!', result: err})
        }
    })
}

