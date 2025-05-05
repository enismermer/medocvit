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
exports.routerUser = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const checkToken_1 = require("../../middlewares/checkToken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
exports.routerUser = (0, express_1.Router)();
exports.routerUser.get("/me", checkToken_1.checkToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.decode(req.token);
    const user = yield prisma.user.findUnique({ where: { id: decoded.id } });
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).send("User not found");
    }
}));
