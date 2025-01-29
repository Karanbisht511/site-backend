import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import { sendMail } from "./emailService.js";
import { isAuthenticated } from "./JWTAuthMiddleware.js";
import { generateToken } from "./JWTFunctions.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*", // Allow all origins (use '*' for open access or specify specific origins)
    methods: ["GET", "POST"], // Allow only these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);
app.use(bodyParser.json());

app.get("/generateToken", async (req, res) => {
  try {
    let randomNum = Math.floor(Math.random() * 1000) + 1;

    const token = generateToken(`rfear${randomNum}aafda`);
    res.status(200).json({ message: token });
  } catch (error) {
    console.error("failed to generate token:", error);
    res.status(500).json({ error: "failed to generate token" });
  }
});

app.post("/send-email", isAuthenticated, async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log(req.body);
  const from = email;
  try {
    await sendMail(from, subject, message);

    console.log("Email successfully sent!");
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email failed to send:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
