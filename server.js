const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDb = require('./config/db');
const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
connectDb();
app.use('/api',express.static('uploads'))
app.use('/api/movie',require('./route/movieRoute'));
app.use('/api/user',require('./route/userRoute'))
app.use('/api/category',require('./route/categoryRoute'))
app.use((err,req,res,next)=>{
    if(err){
        console.log(err);
    }
})
app.use(errorHandler);
app.use(cors());
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log('Node server connected : ', PORT);
}) 