import { Request, Response } from "express";
import { ChatService } from "../services/ChatService";
import { MERMAID_INSTRUCTION } from "../config/constants";
class ChatController {
  private chatService: ChatService;

  constructor() {
    this.chatService = new ChatService();
  }

  public async convert(req: Request, res: Response): Promise<void> {
    try {
      const chat = await this.chatService.convert(req.body);
      res.json(chat);
    } catch (error) {
      console.error("Error in convert function:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async modifyMermaid(req: Request, res: Response): Promise<void> {
    try {
      const { mermaid, userRequest } = req.body;

      const mermaidString = JSON.stringify(mermaid, null, 2)
      const userRequestString= JSON.stringify(userRequest, null, 2)

      const userRequestInstruction = "FEATURE:\n" + userRequestString + MERMAID_INSTRUCTION
      const chat = await this.chatService.modifyMermaid(mermaidString, userRequestInstruction);

      res.json(chat)
    } catch (error) {
      console.error("Error in convert function:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default ChatController;

