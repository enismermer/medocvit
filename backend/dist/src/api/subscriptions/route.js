"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const routerSubscription = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
exports.default = routerSubscription;
