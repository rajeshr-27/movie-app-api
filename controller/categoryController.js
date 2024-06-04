// const asyncHandler = require('express-async-handler');
// const CategoryModel = require('../model/CategoryModel')
// //desc Get Categorys
// //Method Get /api/category
// //Public
// const getCategory = asyncHandler(async(req,res) => {
//     const categoryList = await CategoryModel.getCategory();
//     res.status(200).json({
//         status:1,
//         category:categoryList
//     })
// })

// module.exports = getCategory

const asyncHandler = require('express-async-handler');
const Category = require('../model/Category')
//desc Get Categorys
//Method Get /api/category
//Public
const getCategory = asyncHandler(async(req,res) => {
    const categoryList = await Category.find({});
    res.status(200).json({
        status:1,
        category:categoryList
    })
})

module.exports = getCategory