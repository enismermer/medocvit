"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const auth_1 = require("./src/api/auth");
const checkToken_1 = require("./src/middlewares/checkToken");
const route_1 = __importDefault(require("./src/api/subscriptions/route"));
const route_2 = __importDefault(require("./src/api/profiles/route"));
const route_3 = __importDefault(require("./src/api/drugs/route"));
const route_4 = __importDefault(require("./src/api/sideEffects/route"));
const route_5 = __importDefault(require("./src/api/takingMedications/route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const apiRouter = express_1.default.Router();
// Route pour la ressource subscriptions
// Avec un checkToken afin de vérifier le token de l'utilisateur connecté
apiRouter.use("/subscriptions", checkToken_1.checkToken, route_1.default);
// Route pour la ressource profiles
// Avec un checkToken afin de vérifier le token de l'utilisateur connecté
apiRouter.use("/profiles", checkToken_1.checkToken, route_2.default);
// Route pour la ressource drugs
// Avec un checkToken afin de vérifier le token de l'utilisateur connecté
apiRouter.use("/drugs", checkToken_1.checkToken, route_3.default);
// Route pour la ressource sideEffects
// Avec un checkToken afin de vérifier le token de l'utilisateur connecté
apiRouter.use("/side-effects", checkToken_1.checkToken, route_4.default);
// Route pour la ressource takingMedications
// Avec un checkToken afin de vérifier le token de l'utilisateur connecté
apiRouter.use("/taking-medication", checkToken_1.checkToken, route_5.default);
// Crée une route pour l'authentification
apiRouter.use("/auth", auth_1.routerAuth);
// Route principale => /api
app.use("/api", apiRouter);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Une erreur interne est survenue." });
});
const PORT = process.env.PORT || 4000;
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
