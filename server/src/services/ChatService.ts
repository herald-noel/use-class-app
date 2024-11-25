import {
  CLASS_INSTRUCTION,
  CLASS_JSON_FORMAT,
  PLANTUML_INSTRUCTION,
} from "../config/constants";
import { ApiConfig } from "../model/Interface/ApiConfig";
import { ConversionService } from "../model/Interface/ConversionService";
import { ConversionStrategy } from "../model/Interface/ConversionStrategy";
import { RetryConfig } from "../model/Interface/RetryConfig";
import { PlantUMLToMermaidStrategy } from "../model/PlantUMLToMermaidStrategy";
import { Prompt } from "../model/Prompt";
import { RetryHandler } from "../model/RetryHandler";
import { UserRequestToPlantUMLStrategy } from "../model/UserRequestToPlantUMLStrategy";
const { removePlantUmlDelimeter } = require("../util/util");

export class ChatService extends RetryHandler implements ConversionService {
  private plantUMLToMermaidStrategy: ConversionStrategy;
  private userRequestToPlantUMLStrategy: ConversionStrategy;

  constructor(config: RetryConfig & ApiConfig) {
    super(config);
    this.plantUMLToMermaidStrategy = new PlantUMLToMermaidStrategy();
    this.userRequestToPlantUMLStrategy = new UserRequestToPlantUMLStrategy();
  }

  async convert(plantUML: string): Promise<any> {
    return this.withRetry(async () => {
      const userPrompt = new Prompt(
        plantUML,
        CLASS_INSTRUCTION,
        CLASS_JSON_FORMAT
      );
      return await this.plantUMLToMermaidStrategy.execute(
        userPrompt.prompt,
        this.config.currentApi
      );
    });
  }

  async plantUML(userRequest: string): Promise<any> {
    return this.withRetry(async () => {
      // Generate PlantUML
      const userPrompt = new Prompt(userRequest, PLANTUML_INSTRUCTION, "");
      const plantUMLResponse = await this.userRequestToPlantUMLStrategy.execute(
        userPrompt.prompt,
        this.config.currentApi
      );

      const cleanPlantUml = removePlantUmlDelimeter(plantUMLResponse);

      // Convert to Mermaid
      const plantUMLPrompt = new Prompt(
        plantUMLResponse,
        CLASS_INSTRUCTION,
        CLASS_JSON_FORMAT
      );
      const mermaidResponse = await this.plantUMLToMermaidStrategy.execute(
        plantUMLPrompt.prompt,
        this.config.currentApi
      );

      return {
        plantUML: cleanPlantUml,
        mermaid: mermaidResponse,
      };
    });
  }
}
