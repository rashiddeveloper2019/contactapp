var {User} = require('../model/user')
// console.log("==============12============")
var authenticate = (req,res,next) => {
    console.log("yha aya hai sabse pahle")
    var token = req.header('x-auth')
    console.log("chutiya rashid",req.header('x-auth'))
    User.findOne({"tokens.token":token}).then((user) => {
        // console.log("==========qwertyu=========",user.tokens.length)
        // console.log("===========baba",user.tokens[0].token == token,"=======shivam", user.tokens[1].token==token )
        if(!user){
           res.send({status:false,message:"you are not authenticated"})
        }
        else{
            req.user=user
            req.token=token
            next()
        }
    })
    
}

module.exports = {authenticate}