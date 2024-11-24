import { Request, Response } from "express";
import { ChatService } from "../services/ChatService";
import { chatConfig } from "../config/chatConfig";
class ChatController {
  private chatService: ChatService;

  constructor() {
    this.chatService = new ChatService(chatConfig);
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

  public async plantUML(req: Request, res: Response): Promise<void> {
    try {
      const chat = await this.chatService.plantUML(req.body);
      res.json(chat);
    } catch (error) {
      console.error("Error in plantUML function:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

}

export default ChatController;

