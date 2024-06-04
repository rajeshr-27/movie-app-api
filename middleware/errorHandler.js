const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode || 500;
    switch(statusCode){
        case 400: 
            res.json({
                title:"Validation Error",
                message:err.message,
                stackTrace:err.stack
            })
        case 401: 
            res.json({
                title:"Authorization Error",
                message:err.message,
                stackTrace:err.stack
            })
        case 404: 
            res.json({
                title:"Not Found Error",
                message:err.message,
                stackTrace:err.stack
            })
        case 500: 
            res.json({
                title:"Internal server Error",
                message:err.message,
                stackTrace:err.stack
            })
        default:
            console.log('no error');
    }
}

module.exports = errorHandler;