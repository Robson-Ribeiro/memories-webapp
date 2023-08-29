import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from '../models/userModel.js';

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    if(!(email && password)) return res.status(400).json({ message: "Missing credentials."});


    try {
        const existingUser = await UserModel.findOne({ email });
        if(!existingUser) return res.status(404).json({ message: "User doesn't exist."});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });

        return res.status(200).json({ token, result: existingUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong." });
    }
}

export const signUp = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    if(!(email && password && confirmPassword && firstName && lastName)) return res.status(400).json({ message: "Missing credentials."});

    try {
        const existingUser = await UserModel.findOne({ email });
        if(existingUser) return res.status(400).json({ message: "User already exists."});

        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords are not equal!"});

        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = await UserModel.create({ email, password: passwordHash, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: newUser, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong." });
    }
}
