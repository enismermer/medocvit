import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { checkToken } from "../../middlewares/checkToken";

const routerProfile = Router();
const prisma = new PrismaClient();

// Create Profile
routerProfile.post("/", async (req, res) => {
    try {
        console.log("Request body:", req.body);

        const { first_name, last_name, birthdate, medical_situation, user_id } = req.body.data;

        if (!first_name || !last_name || !birthdate || !medical_situation || !user_id) {
            console.log("Missing fields:", { first_name, last_name, birthdate, medical_situation, user_id });
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newProfile = await prisma.profile.create({
            data: {
                first_name,
                last_name,
                birthdate: new Date(birthdate),
                medical_situation,
                user_id,
            },
        });

        console.log("Profile created:", newProfile);
        res.status(201).json(newProfile);
    } catch (error) {
        console.error("Error creating profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Read All Profiles
routerProfile.get("/", checkToken, async (_req: Request, res: Response) => {
  try {
    const profiles = await prisma.profile.findMany();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
});

// Read One Profile
routerProfile.get("/:id", checkToken, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const profile = await prisma.profile.findUnique({ where: { id } });
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// Update Profile
routerProfile.put("/:id", checkToken, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const updated = await prisma.profile.update({
      where: { id },
      data: req.body
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Failed to update profile", details: error });
  }
});

// Delete Profile
routerProfile.delete("/:id", checkToken, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.profile.delete({ where: { id } });
    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete profile" });
  }
});

export default routerProfile;
