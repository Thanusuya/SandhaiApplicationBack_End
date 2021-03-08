const mongoose= require('mongoose');

const imageSchema= mongoose.Schema(
    {
        variety:String,
        gender:String,
        age:String,
        price:String,
        colour:String,
        description:String,
        product:String,

        image:{
            type: String,

            required: true
        }
    }
);
module.exports=mongoose.model("Images",imageSchema)