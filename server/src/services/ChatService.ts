const {
  chatUtil,
  isRetryableError,
  delay,
  isTooManyRequests,
  switchApiKey,
} = require("../util/util");
import { jsonrepair } from "jsonrepair";

import { Prompt } from "../model/Prompt";
import { CLASS_INSTRUCTION, CLASS_JSON_FORMAT } from "../config/constants";

export class ChatService {
  private maxRetries = 10;
  private retryDelay = 0;
  private currentApi = "GROQ_API_KEY_1";

  async convert(plantUML: string) {
    let retries = 0;

    while (retries < this.maxRetries) {
      try {

        const userPrompt = new Prompt(
          plantUML,
          CLASS_INSTRUCTION,
          CLASS_JSON_FORMAT
        );

        const response = await chatUtil(userPrompt.prompt, this.currentApi);

        // JSON PRE-PROCESSING
        const json = response.choices[0]?.message?.content;
        const jsonString = JSON.stringify(json);
        const cleanJson = jsonrepair(jsonString);

        console.log(JSON.parse(cleanJson));
        return JSON.parse(cleanJson);
      } catch (error) {

        console.error(
          `Error in ChatService convert method (attempt ${retries + 1}):`,
          error
        );

        if (isTooManyRequests(error)) {
          retries++;
          this.currentApi = switchApiKey(this.currentApi);
          console.log("error test");
          continue;
        }

        if (isRetryableError(error) && retries < this.maxRetries - 1) {
          retries++;
          await delay(this.retryDelay * retries);
          continue;
        }
      }
    }
    throw new Error("Max retries reached");
  }
}
