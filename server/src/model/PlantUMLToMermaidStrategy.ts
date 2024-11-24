const { convertPlantUmlToMermaid } = require("../util/util");
import { jsonrepair } from "jsonrepair";
import { ConversionStrategy } from "./Interface/ConversionStrategy";

export class PlantUMLToMermaidStrategy implements ConversionStrategy {
  async execute(input: string, apiKey: string): Promise<any> {
    const response = await convertPlantUmlToMermaid(input, apiKey);
    const json = response.choices[0].message.content;
    const jsonString = JSON.stringify(json);
    const cleanJson = jsonrepair(jsonString);
    return JSON.parse(cleanJson);
  }
}
