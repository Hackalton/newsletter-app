require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('express')
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');  //to be completed
const newsletterControlRoutes = require('./routes/newsletterRoutes');
const dbUrl = process.env.DB_CONNECTION_URL;
const student = require('./controllers/studentControl');
const journalist = require('./controllers/journalistControl')
const newsletter = require('./controllers/newsletterControl')
const admin = require('./controllers/adminControl');

const app = express(); 
const PORT = 3000;

//middleware
app.use(express.json());
app.use(cors()); 
app.use(router());
authRoutes(app);
app.use('', newsletterControlRoutes);

//routes

app.post('/api/student/create', student.create);
app.get('/api/student/retrieve', student.retrieve);
app.put('/api/student/update', student.update);
app.delete('/api/student/:_id', student.delete);
app.get(`/api/student/:_id`, student.get);

app.post('/api/journalist/create', journalist.create);
app.get('/api/journalist/retrieve', journalist.retrieve);
app.put('/api/journalist/update', journalist.update);
app.delete('/api/journalist/:_id', journalist.delete);
app.get(`/api/journalist/:_id`, student.get);


app.get('/api/newsletter/retrieve', newsletter.retrieve);
app.post('/api/newsletter/create', newsletter.create);
app.put('/api/newsletter/update', newsletter.update);
app.delete('/api/newsletter/:_id', newsletter.delete);
app.get(`/api/newsletter/:_id`, student.get);


app.get('/api/admin/retrieve', admin.retrieve);
app.post('/api/admin/create', admin.create);
app.put('/api/admin/update', admin.update);
app.delete('/api/admin/:_id', admin.delete);
app.get(`/api/newsletter/:_id`, student.get);




//db connection
mongoose.connect(dbUrl)
    .then(()=>{
        console.log('Database connected successfully')
    })
    .catch(err=>{
        console.log('Database connection failed! Error!');
    });


//server running
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})
