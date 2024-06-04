const db = require('../config/dbConnection');

const CategoryModel = {
    getCategory : async () => {
        const result = await db.query("SELECT * FROM category");
        return result[0];
    }
}

module.exports = CategoryModel;