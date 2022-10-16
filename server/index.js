const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const path=require('path')

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname,'build')));

const PORT = process.env.PORT || 5500;

app.use(cors());


const TodoItemRoute = require('./routes/todoItems');


mongoose.connect(process.env.DB_CONNECT)
.then(()=> console.log("Database connected"))
.catch(err => console.log(err));


app.use('/', TodoItemRoute);
app.use(express.static(path.resolve(__dirname,'../client/public/index.html')));

app.get('/api',(req,res)=>{
    res.json({message:"hello"});
})

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../client/public','index.html'))
});


app.listen(PORT, ()=> console.log("Server connected"));
