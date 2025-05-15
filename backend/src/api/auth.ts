import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { DecodeToken, checkToken } from "../middlewares/checkToken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const routerAuth = Router();

// --- Register ---
routerAuth.post("/local/register", async (req, res) => {
    const { email, password, first_name, last_name, gender, birth_date } = req.body.data;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!));
    const newUser = await prisma.user.create({
    data: {
        email,
        password: hashedPassword,
        first_name,
        last_name,
        gender,
        birthdate: new Date(birth_date),
        profile: {
            create: {
                first_name,
                last_name,
                birthdate: new Date(birth_date)
                // ajoute d'autres champs si ton modèle Profile en a
            }
        }
    },
    include: {
        profile: true
    }
});

    res.status(201).json(newUser);
});


// --- Login ---
routerAuth.post("/local", async (req, res) => {
    const { email, password } = req.body.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return res.status(400).json("Email or Password is incorrect");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).json("Email or Password is incorrect");
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
    );

    res.json({
        token,
        user: {
            id: user.id,
            email: user.email,
        }
    });
});
