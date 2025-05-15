"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAuth = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.routerAuth = (0, express_1.Router)();
// --- Register ---
exports.routerAuth.post("/local/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, first_name, last_name, gender, birth_date } = req.body.data;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    const existingUser = yield prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, parseInt(process.env.SALT_ROUNDS));
    const newUser = yield prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            first_name,
            last_name,
            gender,
            birthdate: new Date(birth_date)
        }
    });
    res.status(201).json(newUser);
}));
// --- Login ---
exports.routerAuth.post("/local", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body.data;
    const user = yield prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(400).json("Email or Password is incorrect");
    }
    const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).json("Email or Password is incorrect");
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({
        token,
        user: {
            id: user.id,
            email: user.email,
        }
    });
}));
