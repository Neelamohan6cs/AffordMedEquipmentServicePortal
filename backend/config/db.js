const mongoose = require("mongoose");

function connectDb() {
    mongoose.connect(process.env.MONGO_DB)
        .then(() => {
            
                console.log("MongoDB Connected (DEV MODE)");
            
        })
        .catch((err) => {
           
                console.log("DB Connection Error:", err);
            
        });
}

module.exports = connectDb;
