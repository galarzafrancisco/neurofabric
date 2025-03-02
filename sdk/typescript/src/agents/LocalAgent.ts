import { IAgent } from '../../../../interfaces/typescript/IAgent';
import { QuestionHandler } from '../../../../interfaces/typescript/QuestionHandler';
import { AgentConfig } from '../../../../interfaces/typescript/AgentConfig';

export class LocalAgent implements IAgent {
  name: string;
  version: string;
  capabilities: string;
  private questionHandler?: QuestionHandler;

  constructor(config: AgentConfig) {
      this.name = config.name;
      this.version = config.version;
      this.capabilities = config.capabilities;
  }

  handleQuestion(handler: QuestionHandler) {
      this.questionHandler = handler;
  }

  async ask(question: string): Promise<string> {
      if (!this.questionHandler) {
          throw new Error("No question handler registered.");
      }
      return this.questionHandler(question);
  }
}
