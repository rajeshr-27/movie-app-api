const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name:{
        type:String
    },
    status:{
        type:String
    }
},
{
    timestamps:true
})

const Category = mongoose.model('category', CategorySchema);

module.exports = Category