export interface IAgent {
  name: string;
  version: string;
  capabilities: string;
  ask(question: string): Promise<string>;
}
