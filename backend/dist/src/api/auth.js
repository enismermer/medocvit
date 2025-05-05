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
exports.routerAuth.post("/local/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const pseudo = req.body.pseudo;
    // const password = req.body.password;
    console.log("Request body:", req.body); // Debugging
    const { pseudo, password } = req.body.data;
    // Vérifier si les données sont valides
    if (!pseudo || !password) {
        return res.status(400).json({ message: "Pseudo and password are required" });
    }
    const userWithEmail = yield prisma.user.findUnique({ where: { pseudo } });
    if (userWithEmail) {
        res.status(400).json("Email already exists");
    }
    else {
        const hashedPassword = yield bcrypt_1.default.hash(password, parseInt(process.env.SALT_ROUNDS));
        const newUser = yield prisma.user.create({
            data: {
                pseudo,
                password: hashedPassword
            }
        });
        res.status(201).json(newUser);
    }
}));
exports.routerAuth.post("/local", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier, password } = req.body.data;
    const userWithEmail = yield prisma.user.findFirst({ where: { pseudo: identifier } });
    if (!userWithEmail) {
        res.status(400).json("Email or Password is incorrect");
    }
    else {
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, userWithEmail.password);
        if (isPasswordCorrect) {
            const token = jsonwebtoken_1.default.sign(userWithEmail, process.env.JWT_SECRET);
            res.json(Object.assign({ token }, userWithEmail));
        }
        else {
            res.status(400).json("Email or Password is incorrect");
        }
    }
}));
