// const asyncHandler = require('express-async-handler')
// const UserModel = require('../model/UserModel');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// //@desc Add User
// //Method POST /api/user/add
// //Access public

// const addUser = asyncHandler( async(req,res)=> {
//     const postData = req.body;
//     console.log(postData);
//     const {name,email,password,mobile_number} = postData;
//     if(!name || !email || !password || !mobile_number){
//         res.status(400);
//         throw new Error('Please Fill The Mandatory Fields')
//     }
//     //check Email
//     const userInfo = await UserModel.getUserByEmail(email);

//     if(userInfo){
//         res.status(400);
//         throw new Error('Email Already Exist');
//     }
//     const hashPassword =await bcrypt.hash(password,10);
//     postData.password = hashPassword;    
//     //Add the User
//     await UserModel.addUser(postData);
//     const json_data ={
//         status:1,
//         message:'User Register Successfuly'
//     }

//     res.status(200).json(json_data);
   
// })

// const loginUser = asyncHandler(async (req,res) => {
//     const {email,password} = req.body;

//     if(!email || !password){
//         res.status(400);
//         throw new Error('Enter the mandatory fields')
//     }
//     //check email
//     const userInfo = await UserModel.getUserByEmail(email);
//     if(userInfo && await bcrypt.compare(password, userInfo.password)){
//         const user = {
//             id:userInfo.id,
//             name:userInfo.name,
//             email:userInfo.email
//         }
//         const token = jwt.sign({
//                 user:user
//             },
//             process.env.ACCESS_TOKEN_SECRET,
//             {
//                 expiresIn:'10m'
//             })
//         const refreshToken = jwt.sign({
//             user: user
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn:'10m'
//         })
//         const json_data = {
//             status:1,
//             message:"login success",
//             token:token,
//             refreshToken:refreshToken,
//             authUser:user
//         }
//         res.status(200).json(json_data);
//     }else {
//         res.status(401);
//         throw new Error('Invalid email or password');
//     }
// })

// module.exports = {addUser, loginUser}

const asyncHandler = require('express-async-handler')
const UserModel = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//@desc Add User
//Method POST /api/user/add
//Access public

const addUser = asyncHandler( async(req,res)=> {
    const postData = req.body;
    console.log(postData);
    const {name,email,password,mobile_number} = postData;
    if(!name || !email || !password || !mobile_number){
        res.status(400);
        throw new Error('Please Fill The Mandatory Fields')
    }
    //check Email
    const userInfo = await UserModel.findOne({email});

    if(userInfo){
        res.status(400);
        throw new Error('Email Already Exist');
    }
    const hashPassword =await bcrypt.hash(password,10);
    postData.password = hashPassword;    
    //Add the User
    await UserModel.create(postData);
    const json_data ={
        status:1,
        message:'User Register Successfuly'
    }

    res.status(200).json(json_data);
   
})

const loginUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error('Enter the mandatory fields')
    }
    //check email
    const userInfo = await UserModel.findOne({email});
    if(userInfo && await bcrypt.compare(password, userInfo.password)){
        const user = {
            id:userInfo.id,
            name:userInfo.name,
            email:userInfo.email
        }
        const token = jwt.sign({
                user:user
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:'10m'
            })
        const refreshToken = jwt.sign({
            user: user
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:'10m'
        })
        const json_data = {
            status:1,
            message:"login success",
            token:token,
            refreshToken:refreshToken,
            authUser:user
        }
        res.status(200).json(json_data);
    }else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
})

module.exports = {addUser, loginUser}