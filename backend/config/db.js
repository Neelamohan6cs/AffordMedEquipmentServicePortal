const mongoose = require("mongoose");

function connectDb() {
    mongoose.connect(process.env.MONGO_DB)
        .then(() => {
            if (process.env.NODE_ENV === "development") {
                console.log("MongoDB Connected (DEV MODE)");
            }
        })
        .catch((err) => {
            if (process.env.NODE_ENV === "development") {
                console.log("DB Connection Error:", err);
            }
        });
}

module.exports = connectDb;