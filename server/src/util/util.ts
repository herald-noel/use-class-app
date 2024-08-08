const { G4F } = require("g4f");
const g4f = new G4F();

module.exports.chatUtil = async (prompt: string) => {
  const options = {
    provider: g4f.providers.GPT,
    model: "gpt-4-0613",
    response_format: { type: "json_object" },
    debug: true,
    proxy: "",
  };
  const messages = [{ role: "user", content: prompt }];

  try {
    const text = await g4f.chatCompletion(messages, options);
    return text;
  } catch (error) {
    console.error("Error during G4F chat completion:", error);
    throw error;
  }
};

module.exports.cleanAndParseJSON = (input:string) => {
try {
    // Remove backticks, the word "json", and trim any leading/trailing whitespace
    const cleanedInput = input.replace(/```json/g, '').replace(/```/g, '').trim();
    // Parse the cleaned JSON string
    return cleanedInput;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return null;
  }
}