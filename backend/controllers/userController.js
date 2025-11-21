import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

//Regiser new user
export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists, please login!" });

        const user = await User.create({ name, email, password });
        res.status(201).json({ _id: user.id, name: user.name, email: user.email, role: user.role, token: generateToken(user.id )});
    } catch (error) {
        res.status(300).json({ message: error.message});
    }
};

//login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && await user.matchPassword(password)){
            res.json({ _id: user.id, name: user.name, email: user.email, role: user.role, token: generateToken(user.id) });
        }
        else{
            res.status(401).json({ message: "Invalid Email or Password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};