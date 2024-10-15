import Groq from "groq-sdk";
import { CLASS_JSON_FORMAT } from "../config/constants";

// TODO: set model dynamic depending on the catch error.
// TODO: refine response OOP

module.exports.chatUtil = async (prompt: string) => {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an expert in converting use case diagrams from PlantUML to JSON object. The format is: ${CLASS_JSON_FORMAT}.`,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.2-11b-vision-preview",
    response_format: { "type": "json_object" },
  });
};


