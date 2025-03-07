const express = require('express')
const bcrybt = require('bcrypt')
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const router = express.Router()
require('dotenv').config();

router.post('/register', async (req, res) => {

    const { username, email, password } = req.body

    try {
        const user = await User.findOne({email})
        
        if (user) {
            return res.status(404).json({ message: "User already exists" })
        }
        
        const hashPass = await bcrybt.hash(password, 10)
        const newUser = new User({username, email, password: hashPass})

        await newUser.save()
        res.status(201).json({message: "User registered successfully"});
    } catch (error) {
        res.status(500).json({error: 'Error registering user'})
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        if (!user) {
            res.status(400).json({ message: "User not found" })
            return
        }
        const isMatched = await bcrybt.compare(password, user.password)
        if (!isMatched) {
            res.status(400).json({ message: "Invalid credentials" })
            return
        }
        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h'})
        res.json({ token })
    } catch (error) {
        res.status(500).json({error: 'Error logging in'})
    }
})

router.get('/test', (req, res)=>{
    res.send("hello")
})

module.exports = router;
