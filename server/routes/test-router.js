
import { Router } from "express";
import Test from "../models/test.model.js";

const router = Router();


router.post('/submit', async (req, res) => {
  const { userId, questions } = req.body;

  const newTestResult = new Test({
    userId,
    questions,
  });

  try {
    const savedTestResult = await newTestResult.save();
    res.status(201).json(savedTestResult);

  } catch (error) {
    console.error('Failed to save test result:', error);
    res.status(500).json({ error: 'Failed to save test result' });
  }
});

export default router;
