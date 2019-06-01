var {User} = require('../model/user')
var bcrypt = require('bcryptjs')
var {Contact} = require('../model/contact')




let  signup = (req, res) => {
    console.log(req,"=================1234676788=======")
    if(req.body.email==null || req.body.phone==null|| req.body.password==null){
    res.send({status:false , message: "invalid form of data"})
}

  else {
      User.findOne({email:req.body.email}).then((response) => {
          if(response){
              res.send({status: false, message:"user already exist"})
          }
          else{
              var salt= "$2a$10$CSrpSnuJNc7.1E4mizNnwe"
              bcrypt.hash(req.body.password, salt,(err,hash) => {
                  var hashedpassword = hash
              
              var user = new User({
                  email:req.body.email,
                  phone:req.body.phone,
                  password:hashedpassword
              })
              user.save().then((user) => {
                  console.log(user)
                  if(user){
                      res.send({status:true, message:"successfully registered"})
                  }
              }).catch((error) => {
                  res.send(error)
              })
                  
          })
        }
      })
  }
}


let signin = (req, res) => {
    console.log("i love u")
    email= req.body.email
    password=req.body.password
    User.findOne({email:req.body.email}).then((user) => {
        if(user){
            bcrypt.compare(req.body.password, user.password,(err,success) => {
                if(success==true){
                    user.generateAuthToken()
                    console.log("=================",user.tokens[0].token)
                    res.send({
                       status:true, message:"login successfully",
                       token: user.tokens[0].token
                    })
                }
                else{
                    res.send({
                        status:false, message:"invalid credentials"
                    })
                }
            })
        }
        else{
            res.send({
                status:false, message: "user not registered"
            })
        }

    })
}


let signout = (req, res) => {
// console.log("Hii i love u", req.token, req.user)
var token = req.token;
User.findOneAndUpdate({"tokens.token":token},{$set:{tokens:[]}},{new: true}).then((response) => {

    console.log(response,"=================89898==============")
    res.send({
        status:false
    })
})
}

let getdata = (req, res) => {
 console.log("=========11=11===1",req.user.email)
 Contact.find({user:req.user.email}).then((response)=>{
     console.log(response)
     res.send({status: true, data:response})
 })
}

let deletedataall = ((req,res) =>{
    var email=req.user.email
    console.log("====poora delete ho rha h===");
    Contact.remove({user:req.user.email}).then((response)=>{
      res.send({response});
      console.log(response);
     },(error)=>{
      res.status(400).send(error);
     
     });
  });


let deletedata = ((req,res) =>{
    var email=req.user.email
    var id = req.body._id
    console.log("====iska user delete ho rha h====");
    Contact.findOneAndDelete({_id:id}).then((response)=>{
      res.send({response});
      console.log(response);
     },(error)=>{
      res.status(400).send(error);
      
     });
  });

  let updatedata = ((req, res) => {
    var id =req.body._id
    var phone=req.body.phone
    
      console.log("=======user update k liye====",id,req.body)
      Contact.findOneAndUpdate({_id:id},{$set:{phone:phone}},{new:true}).then((response)=>{
        res.send({response});
        console.log(response,"=======pppppp=====");
        console.log(req.body.name)
        },(error)=>{
        res.status(400).send(error);
        
      }) 

    
  })




module.exports = {signup, signin, signout, getdata, deletedataall, deletedata, updatedata}