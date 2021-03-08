const express = require('express')
const User = require('../models/user_model')
const model=require('../models/model.js')
const bcrypt = require('bcrypt')
const app = express()
const multer=require('multer')
const router = express.Router()
const path=require('path')

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
  .catch(_err=>{
      res.json    ({
          error:(res.json({
            status:false,
            message:"Oops! Auth failed now"

    }))

      });
    });

})

app.use('/uploads', express.static('uploads'));
var storage = multer.diskStorage({
   destination: function (_req, file, cb) {
     cb(null, path.join('./uploads'))
   },
   filename: function (_req, file, cb) {
     cb(null, Date.now() + file.originalname);
   }
 })
var upload = multer({ storage: storage})
router.post('/upload', upload.single('myFile'), async(req, res, next) => {
    const File = req.file
     if (!File) {
       const error = new Error('Please upload a file')
       error.httpStatusCode = 400
       return next("hey error")
     }
       const imagepost= new model({
        variety:req.body.variety,
        gender:req.body.gender,
        age:req.body.age,
        price:req.body.price,
        colour:req.body.colour,
        description:req.body.description,
        product:req.body.product,
         image: File.path
       })
      const savedimage= await imagepost.save()
       res.json(savedimage)
     })  
module.exports = router
