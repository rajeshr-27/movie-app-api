const mongoose =require('mongoose');
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.DBSTRING);
        console.log("Mongo Db connected successfully", connect.connection.name)
    }catch(error){
        console.log(error)
    }
}

module.exports = connectDb;