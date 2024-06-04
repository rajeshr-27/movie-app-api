const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    mobile_number:{
        type:String
    }
},
{
    timestamps:true
})

const User = mongoose.model('users',UserSchema);

module.exports = User;