import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const systemPrompt = `
You are TravelMate AI, an expert travel assistant.

Give:
- Day-wise itinerary
- Budget breakdown (INR)
- Best time to visit
- Top attractions
- Travel tips
`;

app.get("/", (req, res) => {
  res.send("TravelMate Backend Running 🚀");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    res.json({
      reply: response.choices[0].message.content,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error" });
  }
});

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});