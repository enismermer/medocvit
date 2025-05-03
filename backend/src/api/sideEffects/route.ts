import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { checkToken } from "../../middlewares/checkToken";

const routerSideEffect = Router();
const prisma = new PrismaClient();

export default routerSideEffect;