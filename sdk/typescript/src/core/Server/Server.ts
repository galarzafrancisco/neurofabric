import express, { Request, Response } from 'express';
import { LocalAgent } from '../../agents/LocalAgent';

class Server {
  private app: express.Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.app.use(express.json());
  }

  registerAgent(agent: LocalAgent): void {
    this.app.post(`/${agent.name}/${agent.version}`, async (req: Request, res: Response) => {
      try {
        const { question, traceId } = req.body;
        if (!question) {
          return res.status(400).json({ error: 'Missing question' });
        }
        const answer = await agent.ask(question);
        res.json({ answer });
      } catch (error) {
        res.status(500).json({ error: 'Agent processing error', details: error.message });
      }
    });
  }

  serve(): void {
    this.app.listen(this.port, () => {
      console.log(`NeuroFabric Server running on port ${this.port}`);
    });
  }
}

export { Server };