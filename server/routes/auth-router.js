import { Router } from "express";
import jwt from 'jsonwebtoken'
import User from "../models/user.model.js";

const router = Router();

// POST REQUEST : SIGN UP
router.post(`/register`, async (req, res) => {
  try {
    const newApexUser = new User(req.body);
    newApexUser.userId = "APEX" + Date.now();
    const savedApexUser = await newApexUser.save();
    res.status(200).json(savedApexUser);
  } catch (error) {
    console.error("Error adding USER:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST REQUEST : LOG IN
router.post('/login', async (req, res) => {

  const { email, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the provided password is correct
    // const isPasswordValid = await user.isPasswordCorrect(password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ error: 'Invalid credentials' });
    // }
    // console.log("check")

    // Generate access token
    // const token = await user.generateAccessToken();

    //temp
    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      'tempSecretKey',
      {
        expiresIn: 10000000
      }
    );


    res.status(200).json({ token });

  } catch (error) {
    console.log('ERROR: ', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
})

export default router;
