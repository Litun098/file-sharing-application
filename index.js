require('dotenv').config();
const multer = require('multer');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const File = require('./models/File');

const app = express();
const upload = multer({dest:"uploads"});

mongoose.connect(process.env.DATABASE_URL);
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/upload', upload.single("file"),async (req,res)=>{
    const fileData = {
        path:req.file.path,
        originalName:req.file.originalname,
    }
    if(req.body.password != null && req.body.password !== ""){
        fileData.password = await bcrypt.hash(req.body.password,8);
    } 
    const file = await File.create(fileData);
    console.log(file);
    res.send(File.originalName)
})

app.listen(process.env.PORT);