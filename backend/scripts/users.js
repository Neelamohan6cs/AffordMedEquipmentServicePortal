const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

const User = require("../models/user");

const seedUsers = async () => {
    try {

        console.log("ENV DB:", process.env.MONGO_DB);

        await mongoose.connect(process.env.MONGO_DB);

        console.log("MongoDB Connected");

        await User.deleteMany();

        await User.insertMany([
            {
                name: "Admin",
                email: "admin@afford.com",
                role: "admin"
            },
            {
                name: "Technician",
                email: "technician@afford.com",
                role: "technician"
            }
        ]);

        console.log("Seed Done 🚀");

        process.exit();

    } catch (err) {
        console.log("Seed Error:", err);
        process.exit(1);
    }
};

seedUsers();
