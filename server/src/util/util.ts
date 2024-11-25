import Groq from "groq-sdk";
import { jsonrepair } from "jsonrepair";
import { CLASS_JSON_FORMAT } from "../config/constants";

module.exports.convertPlantUmlToMermaid = async (
  prompt: string,
  currentApiKey: string
) => {
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

module.exports.convertUserRequestToPlantUml = async (
  prompt: string,
  currentApiKey: string
) => {
  const groq = new Groq({ apiKey: process.env[currentApiKey] });
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an expert in translating user request to a plantUML use-case diagram.`,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.2-11b-vision-preview",
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

module.exports.processJsonResponse = (response: any) => {
  if (!response?.choices?.[0]?.message?.content) {
    throw new Error("Invalid response structure");
  }

  const json = response.choices[0].message.content;
  const jsonString = JSON.stringify(json);
  const cleanJson = jsonrepair(jsonString);

  return JSON.parse(cleanJson);
};

module.exports.removePlantUmlDelimeter = (text: string) => {
  if (typeof text !== "string") {
    throw new TypeError("Input must be a string");
  }

  text = text.replace(/^```plantuml\n?/, "");
  text = text.replace(/^```\n?/, "");
  text = text.replace(/```$/, "");
  return text.trim();
};
