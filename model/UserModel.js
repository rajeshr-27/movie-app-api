const db = require("../config/dbConnection");
const { post } = require("../route/movieRoute");

const UserModel = {
    addUser: async (postData) => {
        //Add Query
        await db.query(
            "INSERT INTO users(name,email,password,mobile_number) values(?)",
            [
                [postData.name,postData.email,postData.password,postData.mobile_number]
            ]
        );
    },
    getUserByEmail: async (email) => {
        const result = await db.query(
            "SELECT * FROM users where email='"+email+"' "
        );
        return result[0][0];
    }
}

module.exports = UserModel;