import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { checkToken } from "../../middlewares/checkToken";

const routerSideEffect = Router();
const prisma = new PrismaClient();

// Create Side Effect
routerSideEffect.post("/", checkToken, async (req, res) => {
    try {
        const { description, reporting_date, profile_id, drug_id } = req.body.data;

        // Validation des champs requis
        if (!description || !reporting_date || !profile_id || !drug_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Création de l'effet secondaire
        const newSideEffect = await prisma.sideEffect.create({
            data: {
                description,
                reporting_date: new Date(reporting_date),
                profile_id,
                drug_id,
            },
        });

        res.status(201).json(newSideEffect);
    } catch (error) {
        console.error("Error creating side effect:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Read All Side Effects
routerSideEffect.get("/", checkToken, async (_req: Request, res: Response) => {
  try {
    const list = await prisma.sideEffect.findMany();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch side effects" });
  }
});

// Read One Side Effect
routerSideEffect.get("/:id", checkToken, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const sideEffect = await prisma.sideEffect.findUnique({ where: { id } });
    if (!sideEffect) return res.status(404).json({ error: "Side effect not found" });
    res.json(sideEffect);
  } catch (error) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// Update Side Effect
routerSideEffect.put("/:id", checkToken, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const updated = await prisma.sideEffect.update({
      where: { id },
      data: req.body
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Failed to update side effect", details: error });
  }
});

// Delete Side Effect
routerSideEffect.delete("/:id", checkToken, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.sideEffect.delete({ where: { id } });
    res.json({ message: "Side effect deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete side effect" });
  }
});

export default routerSideEffect;
