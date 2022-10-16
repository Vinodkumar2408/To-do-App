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

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'build','index.html'));
})




app.listen(PORT, ()=> console.log("Server connected"));
