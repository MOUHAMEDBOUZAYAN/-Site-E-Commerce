const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/users')
const productRoutes = require('./routes/products')

const app = express()
const PORT = 9000

app.use(cors());
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/eco')
.then(()=>{console.log('MongoDb is Connected')})
.catch((err)=> console.log(err))

app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

