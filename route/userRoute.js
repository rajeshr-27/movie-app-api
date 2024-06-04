const express = require('express');
const { addUser, loginUser} = require('../controller/userController');
const validateToken = require('../middleware/validateToken');
const validateRefreshToken = require('../middleware/validateRefreshToken');
const Router = express.Router();

Router.post('/add', addUser);
Router.post('/login',loginUser);
Router.get('/auth-user',validateToken, (req,res)=>{
    //console.log(req.user);
    const json_data = {
        status:1,
        authUser:req.user,
        message:"authentication success"
    }
    res.status(200).json(json_data);
})
Router.get('/refresh-token',validateRefreshToken, (req,res)=> {
    const json_data = {
        status:1,
        message:'authentication success',
        token:req.token,
        refreshToken : req.refreshToken,
        authUser:req.user
    }
    res.status(200).json(json_data);
})

module.exports = Router;