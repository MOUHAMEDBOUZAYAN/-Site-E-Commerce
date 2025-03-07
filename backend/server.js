const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/users')
const productRoutes = require('./routes/products')
const commentRoutes = require('./routes/comments')
require('dotenv').config();

const app = express()
const PORT = 9000
const MONGO_URI = process.env.MONGO_URL;

app.use(cors());
app.use(express.json())

mongoose.connect(MONGO_URI)
.then(()=>{console.log('MongoDb is Connected')})
.catch((err)=> console.log(err))

app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/comments", commentRoutes)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
