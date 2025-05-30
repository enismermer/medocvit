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
exports.checkToken = checkToken;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function checkToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const fullToken = req.headers.authorization;
        if (!fullToken) {
            return res.status(401).json({ message: "No token provided" });
        }
        const [typeToken, token] = fullToken.split(" ");
        if (typeToken !== "Bearer" || !token) {
            return res.status(401).json({ message: "Invalid token type or format" });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.token = token;
            req.decodedToken = decoded; // Stocker le token décodé si nécessaire
            next();
        }
        catch (error) {
            console.error("Token verification failed:", error);
            return res.status(401).json({ message: "Invalid token" });
        }
    });
}
