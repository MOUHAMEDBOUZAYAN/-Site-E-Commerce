const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
 username: {
    type: String,
    required: true
 },
 email: {
    type: String,
    required: true, 
    unique: true
 },
 password:{
    type: String,
    required: true
 },
 isAdmin:{
   type: Boolean,
   required: true
 }
})

const userModel = mongoose.model('User', UserSchema)

module.exports = userModel;