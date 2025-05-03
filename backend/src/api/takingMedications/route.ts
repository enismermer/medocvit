import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { checkToken } from "../../middlewares/checkToken";

const routerTakingMedication = Router();
const prisma = new PrismaClient();

export default routerTakingMedication;