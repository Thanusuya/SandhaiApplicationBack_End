const express = require('express')
const User = require('../models/user_model')
const bcrypt = require('bcrypt')
const router = express.Router()


router.post('/Register',(req,res)=>{
    User.findOne({phonenumber:req.body.phonenumber},(err,user)=>{
        if(err){
            console.log(err)
            res.json(err)
        }else{
            if(user==null){
                const user = User({
                    name:req.body.name,
                    phonenumber:req.body.phonenumber,
                    password:req.body.password,
                    email:req.body.email,
                    address:req.body.address,
                    state:req.body.state,
                    district:req.body.district

                })
                user.save()
                .then((err)=>{
                    if(err){
                        console.log(err)
                        res.json(err)
                    }else{
                        console.log(user)
                        res.json(user)
                    }
                    
                })
            }else{

            res.json({
                message:'number is already avilable'

            })  
             
            }
        }
    })
    
})

router.post('/login',(req,res)=>{
  User.findOne({ phonenumber: req.body.phonenumber })

  .exec()
 .then(user=>{
      if(user.length<1){
          return res.status(401).json({
              status:false,
              msg:"user not found"
          })
      }       
      
          bcrypt.compare(req.body.password,user.password,(err,result)=>{
              if(err){
                  return res.status(401).json({
                      status:false,
                      msg:"Oops! Auth Failed"
                      
                  })
              }
              
                if(result){
                  return res.status(200).json({
                      status:true,
                      message:" Auth Successfull!"
                  })

              }
               res.status(401).json({
                      status:false,
                      message:"Oops! Auth failed now"

              })

          })
      
  })
  .catch(err=>{
      res.json    ({
          error:(res.json({
            status:false,
            message:"Oops! Auth failed now"

    }))

      });
    });

})  
module.exports = router
