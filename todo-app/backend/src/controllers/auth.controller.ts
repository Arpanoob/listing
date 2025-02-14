    import { Request, Response } from "express";
    import bcrypt from "bcryptjs";
    import User from "../models/user.model"
    import jwt from "jsonwebtoken";
    import Joi from "joi";

    export const registerSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    export const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const JWT_SECRET = process.env.JWT_SECRET || "aa";
    export const register = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                res.status(400).json({ error: "User already exists" }); return;
            }
            const newUser = await User.create({ name, email, password: password });

            const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, {
                expiresIn: "1h",
            });

            res.status(201).json({
                message: "User registered successfully",
                user: {
                    userId: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                },
                token,
            });
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    };

    export const login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) {
                res.status(400).json({ error: "Invalid email" });
                return;
            }
            const isPasswordValid = await bcrypt.compare(password.trim(), user.dataValues.password);

            if (!isPasswordValid) {
                res.status(400).json({ error: "Invalid password" });
                return 
            }

            const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
                expiresIn: "1h",
            });

            res.status(200).json({
                message: "Login successful",
                user: {
                    userId: user.id,
                    name: user.name,
                    email: user.email,
                },
                token,
            });
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    };


