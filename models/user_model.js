const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const ObjectID=mongoose.Schema.Types.ObjectId;
const newSchema = mongoose.Schema({
    email:String,
    password:String,
    name:String,
    phonenumber:String,
    address:String,
    state:String,
    district:String,
    objId:ObjectID
})

newSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return next(err); }
      user.password = hash;
      next();
    })
})

module.exports = mongoose.model('User',newSchema)

