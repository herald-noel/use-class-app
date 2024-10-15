const { chatUtil } = require("../util/util");
import { jsonrepair } from "jsonrepair";

import { Prompt } from "../model/Prompt";
import { CLASS_INSTRUCTION, CLASS_JSON_FORMAT } from "../config/constants";

export class ChatService {
  async convert(plantUML: string) {
    try {
      const userPrompt = new Prompt(
        plantUML,
        CLASS_INSTRUCTION,
        CLASS_JSON_FORMAT
      );
      const response = await chatUtil(userPrompt.prompt);

      const json = response.choices[0]?.message?.content;
      const jsonString = JSON.stringify(json);
      const cleanJson = jsonrepair(jsonString);
      console.log(JSON.parse(cleanJson));
      return JSON.parse(cleanJson);
    } catch (error) {
      console.error("Error in ChatService convert method:", error);
    }
  }
}
