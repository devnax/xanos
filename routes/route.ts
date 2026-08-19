import { Router } from "express";
const router = Router();

router.get("/products", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

export default router;
