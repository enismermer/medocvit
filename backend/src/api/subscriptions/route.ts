import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { checkToken } from "../../middlewares/checkToken";

const routerSubscription = Router();
const prisma = new PrismaClient();

export default routerSubscription;