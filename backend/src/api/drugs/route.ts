import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { checkToken } from "../../middlewares/checkToken";

const routerDrug = Router();
const prisma = new PrismaClient();

// Create Drug
routerDrug.post("/", async (req, res) => {
    try {
        console.log("Request body:", req.body);

        const { name, type, description, profile_id } = req.body.data;

        if (!name || !type || !description || !profile_id) {
            console.log("Missing fields:", { name, type, description, profile_id });
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newDrug = await prisma.drug.create({
            data: {
                name,
                type,
                description,
                profile_id,
            },
        });

        console.log("Drug created:", newDrug);
        res.status(201).json(newDrug);
    } catch (error) {
        console.error("Error creating drug:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Read All Drugs
routerDrug.get("/", checkToken, async (req, res) => {
    try {
        const drugs = await prisma.drug.findMany();
        res.json(drugs);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch drugs" });
    }
});

// Read One Drug by ID
routerDrug.get("/:id", checkToken, async (req, res) => {
    const { id } = req.params;
    try {
        const drug = await prisma.drug.findUnique({
            where: { id: parseInt(id) },
        });
        if (!drug) return res.status(404).json({ error: "Drug not found" });
        res.json(drug);
    } catch (error) {
        res.status(400).json({ error: "Invalid ID" });
    }
});

// Update Drug
routerDrug.put("/:id", checkToken, async (req, res) => {
    const { id } = req.params;
    try {
        const updatedDrug = await prisma.drug.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(updatedDrug);
    } catch (error) {
        res.status(400).json({ error: "Failed to update drug", details: error });
    }
});

// Delete Drug
routerDrug.delete("/:id", checkToken, async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.drug.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: "Drug deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: "Failed to delete drug" });
    }
});

export default routerDrug;
