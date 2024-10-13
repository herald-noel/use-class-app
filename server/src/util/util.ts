import Groq from "groq-sdk";


module.exports.chatUtil = async (prompt: string) => {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.2-11b-vision-preview",
    response_format: { "type": "json_object" },
  });
};
