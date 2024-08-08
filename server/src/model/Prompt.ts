export class Prompt {
  private _userPrompt: string;
  private _formattedJSON: string;
  private _instruction: string;

  constructor(userPrompt: string, instruction: string, formattedJSON: string) {
    this._userPrompt = userPrompt;
    this._instruction = instruction;
    this._formattedJSON = formattedJSON;
  }

  get userPrompt(): string {
    return this._userPrompt;
  }

  set userPrompt(value: string) {
    this._userPrompt = value;
  }

  get instruction(): string {
    return this._instruction;
  }

  set instruction(value: string) {
    this._instruction = value;
  }

  get formattedJSON(): string {
    return this._formattedJSON;
  }

  set formattedJSON(value: string) {
    this._formattedJSON = value;
  }

  get prompt(): string {
    return this.userPrompt + "\n\n" + this.instruction + "\n" + this.formattedJSON;
  }
}
