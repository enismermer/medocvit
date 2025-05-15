import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { checkToken } from "../../middlewares/checkToken";

const routerSubscription = Router();
const prisma = new PrismaClient();

// Create Subscription
routerSubscription.post("/", async (req, res) => {
    try {
        const { start_date, type, user_id } = req.body.data;

        if (!start_date || !type || !user_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newSubscription = await prisma.subscription.create({
            data: {
                start_date: new Date(start_date),
                type,
                user_id,
            },
        });

        res.status(201).json(newSubscription);
    } catch (error) {
        console.error("Error creating subscription:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Read All Subscriptions
routerSubscription.get("/", checkToken, async (_req: Request, res: Response) => {
  try {
    const subs = await prisma.subscription.findMany();
    res.json(subs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subscriptions" });
  }
});

// Read One Subscription
routerSubscription.get("/:id", checkToken, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const subscription = await prisma.subscription.findUnique({ where: { id } });
    if (!subscription) return res.status(404).json({ error: "Subscription not found" });
    res.json(subscription);
  } catch (error) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// Update Subscription
routerSubscription.put("/:id", checkToken, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const updated = await prisma.subscription.update({
      where: { id },
      data: req.body
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Failed to update subscription", details: error });
  }
});

// Delete Subscription
routerSubscription.delete("/:id", checkToken, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.subscription.delete({ where: { id } });
    res.json({ message: "Subscription deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete subscription" });
  }
});

export default routerSubscription;
