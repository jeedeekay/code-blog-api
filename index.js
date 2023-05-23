const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const dbConfig = require('./MongoDB');

const app = express();

const salt = bcrypt.genSaltSync(10);

app.use(cors());
app.use(express.json());

const url = dbConfig.mongoUrl;
const connect = mongoose.connect(url);

app.post('/register', async (req, res) => {
    const {username,password} = req.body;
    try {
        const userDoc = await User.create({
            username, 
            password: bcrypt.hashSync(password, salt)
        });
        res.json(userDoc);
    } catch(e) {
        res.status(400).json(e);
    }
    
});

connect.then(() => console.log('Connected correctly to server'), 
    err => console.log(err)
);

app.listen(4000);

// https://www.youtube.com/watch?v=xKs2IZZya7c
// Paused at 1:09:05, about to set up login script