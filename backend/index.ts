import cors from "cors";
import "dotenv/config";
import express from "express";
import { routerAuth } from "./src/api/auth";
import { routerUser } from "./src/api/users/route";
import { checkToken } from "./src/middlewares/checkToken";
import routerSubscription from "./src/api/subscriptions/route";
import routerProfile from "./src/api/profiles/route";
import routerDrug from "./src/api/drugs/route";
import routerSideEffect from "./src/api/sideEffects/route";
import routerTakingMedication from "./src/api/takingMedications/route";

const app = express();

app.use(cors());
app.use(express.json());

const apiRouter = express.Router();



// Route pour la ressource subscriptions
// Avec un checkToken afin de vérifier le token de l'utilisateur connecté
apiRouter.use("/subscriptions", checkToken, routerSubscription);

// Route pour la ressource profiles
// Avec un checkToken afin de vérifier le token de l'utilisateur connecté
apiRouter.use("/profiles", checkToken, routerProfile);

// Route pour la ressource drugs
// Avec un checkToken afin de vérifier le token de l'utilisateur connecté
apiRouter.use("/drugs", checkToken, routerDrug);

// Route pour la ressource sideEffects
// Avec un checkToken afin de vérifier le token de l'utilisateur connecté
apiRouter.use("/sideEffects", checkToken, routerSideEffect);

// Route pour la ressource takingMedications
// Avec un checkToken afin de vérifier le token de l'utilisateur connecté
apiRouter.use("/takingMedications", checkToken, routerTakingMedication);

// Crée une route pour l'authentification
apiRouter.use("/auth", routerAuth);

apiRouter.use("/users", checkToken, routerUser);


// Route principale => /api
app.use("/api", apiRouter);

app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).json({ error: "Une erreur interne est survenue." });
});


const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
});