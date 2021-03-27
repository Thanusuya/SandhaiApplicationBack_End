const mongoose= require('mongoose');

const imageSchema= mongoose.Schema(
    {   category:String,
        variety:String,
        gender:String,
        age:String,
        price:String,
        colour:String,
        description:String,
        location:String,
        height:String,
        weight:String,
        image:{
            type: String,

            required: true
        }
    }
);
module.exports=mongoose.model("Images_upload",imageSchema)