import { ApiConfig } from "./Interface/ApiConfig";
import { RetryConfig } from "./Interface/RetryConfig";

const {
  isRetryableError,
  delay,
  isTooManyRequests,
  switchApiKey,
} = require("../util/util");

export class RetryHandler {
  constructor(protected config: RetryConfig & ApiConfig) {}

  protected async withRetry<T>(operation: () => Promise<T>): Promise<T> {
    let retries = 0;
    
    while (retries < this.config.maxRetries) {
      try {
        return await operation();
      } catch (error) {
        console.error(
          `Error in operation (attempt ${retries + 1}):`,
          error
        );

        if (isTooManyRequests(error)) {
          retries++;
          this.config.currentApi = switchApiKey(this.config.currentApi);
          continue;
        }

        if (isRetryableError(error) && retries < this.config.maxRetries - 1) {
          retries++;
          await delay(this.config.retryDelay * retries);
          continue;
        }

        throw error;
      }
    }
    
    throw new Error("Max retries reached");
  }
}