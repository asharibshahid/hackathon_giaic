import OpenAI from "openai";

export const config = { runtime: "nodejs" };

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { messages } = req.body || {};
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "messages must be an array" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant for Physical AI & Humanoid Robotics. Keep answers concise and practical.",
        },
        ...messages,
      ],
      temperature: 0.4,
    });

    const reply = completion.choices?.[0]?.message?.content ?? "";
    return res.status(200).json({ reply });
  } catch (err: any) {
    return res.status(500).json({
      error: "Server error",
      detail: err?.message || String(err),
    });
  }
}

