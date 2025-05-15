import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { checkToken } from "../../middlewares/checkToken";

const routerTakingMedication = Router();
const prisma = new PrismaClient();

// Create TakingMedication
routerTakingMedication.post("/", checkToken, async (req: Request, res: Response) => {
    try {
        const { take_hour, remainder_type, profile_id, drug_id } = req.body.data;

        // Validation des champs requis
        if (!take_hour || !remainder_type || !profile_id || !drug_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Création de l'enregistrement TakingMedication
        const newTakingMedication = await prisma.takingMedication.create({
            data: {
                take_hour: new Date(take_hour),
                remainder_type,
                profile_id,
                drug_id,
            },
        });

        res.status(201).json(newTakingMedication);
    } catch (error) {
        console.error("Error creating taking medication:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Read All TakingMedications
routerTakingMedication.get("/", checkToken, async (_req: Request, res: Response) => {
  try {
    const list = await prisma.takingMedication.findMany();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch takingMedications" });
  }
});

// Read One TakingMedication
routerTakingMedication.get("/:id", checkToken, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const tm = await prisma.takingMedication.findUnique({ where: { id } });
    if (!tm) return res.status(404).json({ error: "Record not found" });
    res.json(tm);
  } catch (error) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// Update TakingMedication
routerTakingMedication.put("/:id", checkToken, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const updated = await prisma.takingMedication.update({
      where: { id },
      data: req.body
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Failed to update takingMedication", details: error });
  }
});

// Delete TakingMedication
routerTakingMedication.delete("/:id", checkToken, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.takingMedication.delete({ where: { id } });
    res.json({ message: "TakingMedication deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete takingMedication" });
  }
});

export default routerTakingMedication;
