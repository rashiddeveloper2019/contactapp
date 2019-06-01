var {Contact} = require('../model/contact')

let contactapp = (req,res)=> {
    console.log(req.user.email,"==========================",req.token,"=========aa=======")
    if(req.body.email==null || req.body.phone==null || req.body.name==null){
      res.send({status:false, message: 'fill all the datails'})
    }

    else{
        var contact = new Contact({
            email:req.body.email,
            phone:req.body.phone,
            name:req.body.name,
            user:req.user.email
        })
        contact.save().then((user) => {
            console.log(user,"|||||||")
            if(user){
                res.send(user)
            }
        }).catch((error) => {
            res.send(error)
        })
    }
}


module.exports = {contactapp}