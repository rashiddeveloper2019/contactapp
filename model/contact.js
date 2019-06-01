const mongoose = require('mongoose')


var ContactSchema = new mongoose.Schema({
    email:{
         type: String,
         required:true,
         trim:true,
        

    },

    name:{
        type:String
    },

    phone:{
        type:Number
    },

    user:{
        type:String,
        required:true
    }
})

var Contact = mongoose.model('Contact', ContactSchema)
module.exports = {Contact}