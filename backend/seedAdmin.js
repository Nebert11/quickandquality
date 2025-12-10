import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        // Check if admin already exists
        const adminExists = await User.findOne({ email: "admin@quickandquality.com" });
        if (adminExists) {
            console.log("Admin user already exists!");
            console.log("Email: admin@quickandquality.com");
            console.log("Password: admin123");
            console.log("\nYou can update the password by editing the seed script if needed.");
            process.exit(0);
        }

        // Create admin user
        const adminUser = await User.create({
            name: "Admin User",
            email: "admin@quickandquality.com",
            password: "admin123", // Password will be hashed by the pre-save hook
            role: "admin"
        });

        console.log("✓ Admin user created successfully!");
        console.log("\nAdmin Credentials:");
        console.log("Email: admin@quickandquality.com");
        console.log("Password: admin123");
        console.log("Role: admin");

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin:", error.message);
        process.exit(1);
    }
};

seedAdmin();
