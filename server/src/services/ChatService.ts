const {
  convertUserRequestToPlantUml,
  convertPlantUmlToMermaid,
  isRetryableError,
  delay,
  isTooManyRequests,
  switchApiKey,
  processJsonResponse,
} = require("../util/util");
import { jsonrepair } from "jsonrepair";

import { Prompt } from "../model/Prompt";
import {
  CLASS_INSTRUCTION,
  CLASS_JSON_FORMAT,
  PLANTUML_INSTRUCTION,
} from "../config/constants";

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

        const response = await convertPlantUmlToMermaid(
          userPrompt.prompt,
          this.currentApi
        );
        return processJsonResponse(response);
      } catch (error) {
        console.error(
          `Error in ChatService convert method (attempt ${retries + 1}):`,
          error
        );

        if (isTooManyRequests(error)) {
          retries++;
          this.currentApi = switchApiKey(this.currentApi);
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

  async plantUML(userRequest: string) {
    const userPrompt = new Prompt(userRequest, PLANTUML_INSTRUCTION, "");

    const response = await convertUserRequestToPlantUml(
      userPrompt.prompt,
      this.currentApi
    );
    const json = response.choices[0].message.content;
    console.log(json)
    return json
    // const jsonString = JSON.stringify(json);
    // const cleanJson = jsonrepair(jsonString);

    // return JSON.parse(cleanJson);
  }
}
