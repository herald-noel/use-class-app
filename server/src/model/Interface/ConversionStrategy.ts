export interface ConversionStrategy {
  execute(input: string, apiKey: string): Promise<any>;
}