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


