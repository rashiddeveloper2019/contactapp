const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true, 

    },
    phone:{
        type:Number,
        require:true,

    },
    password:{
        required: true,
        type: String

    },
    tokens: [{
        access:{
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

UserSchema.methods.generateAuthToken = function() {
    var user =  this;
    var access ='auth';
    var token = jwt.sign({_id: user._id.toHexString(), access},'iloveubaba').toString()
    
     user.tokens.push({access,token})
     user.save().then(()=>{
         return token
         
     })
}

var User = mongoose.model('User', UserSchema)
module.exports = {User}