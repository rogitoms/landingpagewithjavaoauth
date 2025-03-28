/**import express from "express";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import pool from "../db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirmpassword } = req.body;

    if (!firstname || !lastname || !email || !password || !confirmpassword) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match." });
    }

    // Check if user already exists
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ success: false, message: "User already exists." });
    }

    // Hash password
    const hashedpassword = await bcrypt.hash(password, 10);
    const hashedconfirmpassword=await bcrypt.hash(confirmpassword, 10)
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Insert user into database
    await pool.query(
      "INSERT INTO users (firstname, lastname, email, password, confirmpassword, otp) VALUES ($1, $2, $3, $4, $5)",
      [firstname, lastname, email, hashedpassword, hashedconfirmpassword, otp]
    );

    // Configure Nodemailer for sending OTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Registration",
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({ success: true, message: "Registration successful! OTP sent to email." });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Server error during registration." });
  }
});

export default router;
*/