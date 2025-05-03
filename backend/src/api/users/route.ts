import { Router, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { checkToken, DecodeToken } from "../../middlewares/checkToken";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
export const routerUser = Router();

routerUser.get("/me", checkToken, async (req: Request & { token?: string }, res) => {
    const decoded = jwt.decode(req.token!) as DecodeToken
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).send("User not found");
    }
});