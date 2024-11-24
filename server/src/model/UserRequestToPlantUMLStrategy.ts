import { ConversionStrategy } from "./Interface/ConversionStrategy";

const { convertUserRequestToPlantUml } = require("../util/util");

export class UserRequestToPlantUMLStrategy implements ConversionStrategy {
  async execute(input: string, apiKey: string): Promise<any> {
    const response = await convertUserRequestToPlantUml(input, apiKey);
    return response.choices[0].message.content;
  }
}