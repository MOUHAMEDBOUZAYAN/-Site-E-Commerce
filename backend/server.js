<<<<<<< HEAD
const express = require("express");
const mongoose= require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/products",
    require("./routes/products")
);
mongoose.connect(process.env.MONGO_URL,{
useNewUrlParser: true,
UseUnifiedTopology: true    
}).then(()=> console.log("connexion à MongoDB"))
.catch((error)=>console.error(" Erreur de connexion MongoDB:", error));
const PORT = process.env.PORT || 4444;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));


=======
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/users')
const productRoutes = require('./routes/products')

const app = express()
const PORT = 9000

app.use(cors());
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/Eco')
.then(()=>{console.log('MongoDb is Connected')})
.catch((err)=> console.log(err))

app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
>>>>>>> f81f201ab4e580fd40e384a816b24d0b554a97bb
