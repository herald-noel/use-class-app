export interface ConversionService {
  convert(input: string): Promise<any>;
}