import ChatController from "../controllers/ChatController";
import express, { Request, Response } from "express";

const router = express.Router();
const chatController = new ChatController();

router.post('/convert', (req: Request, res: Response) => chatController.convert(req, res));
router.post('/modify-mermaid', 
  express.json(), 
  (req: express.Request, res: express.Response) => chatController.modifyMermaid(req, res)
);

export default router;
