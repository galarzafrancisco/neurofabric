import { IAgent } from '../../../interfaces/typescript/IAgent';
import { AgentRegistryEntry } from '../../../interfaces/typescript/AgentRegistryEntry';

export class RemoteAgent implements IAgent {
  name: string;
  version: string;
  capabilities: string;
  private url: string;

  constructor(agentInfo: AgentRegistryEntry) {
      this.name = agentInfo.name;
      this.version = agentInfo.version;
      this.capabilities = agentInfo.capabilities;
      this.url = agentInfo.url;
  }

  async ask(question: string): Promise<string> {
      const response = await fetch(this.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question })
      });

      if (!response.ok) {
          throw new Error(`Error communicating with remote agent: ${response.statusText}`);
      }

      return response.json();
  }
}
