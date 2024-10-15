import Groq from "groq-sdk";
import { CLASS_JSON_FORMAT } from "../config/constants";

// TODO: set model dynamic depending on the catch error.
// TODO: refine response OOP

module.exports.chatUtil = async (prompt: string, currentApiKey: string) => {
  const groq = new Groq({ apiKey: process.env[currentApiKey] });
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
    response_format: { type: "json_object" },
  });
};

module.exports.isRetryableError = (error: any) => {
  return (
    error.status === 400 && error.error?.error?.type === "invalid_request_error"
  );
};

module.exports.isTooManyRequests = (error: any) => {
  return error.status === 429;
};

module.exports.delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

module.exports.switchApiKey = (currentApiKey: string) => {
  return currentApiKey === "GROQ_API_KEY_1"
    ? "GROQ_API_KEY_2"
    : "GROQ_API_KEY_1";
};
