const express = require('express');
const cors = require('cors');
const router = require('express')
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');  //to be completed
const dbUrl = 'mongodb+srv://hackalton:Douglascosta11.@cluster0.nudag.mongodb.net/newsletter?retryWrites=true&w=majority&appName=Cluster0';
const student = require('./controllers/studentControl');
const journalist = require('./controllers/journalistControl')


const app = express();
const PORT = 3000;

//middleware
app.use(express.json());
app.use(cors()); 
app.use(router());
authRoutes(app)


//routes
// app.use('/api/auth', authRoutes);

app.post('/api/student/create', student.create);
app.get('/api/student/retrieve', student.retrieve);

app.post('/api/journalist/create', journalist.create);
app.get('/api/journalist/retrieve', journalist.retrieve);



//db connection
mongoose.connect(dbUrl)
    .then(()=>{
        console.log('Database connected successfully')
    })
    .catch(err=>{
        console.log('Database connection failed! Error!');
    })

//server running
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})
