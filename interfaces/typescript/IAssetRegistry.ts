import { LocalAgent } from "../../sdk/typescript/src/agents/LocalAgent";
import { AgentRegistryEntry } from "./AgentRegistryEntry";

// TODO: I don't like that we are using LocalAgent here because we are in the interfaces folder
// and LocalAgent is an SDK implementation concept. Rethink this!
export interface IAgentRegistry {
  find(name: string, version: string): Promise<AgentRegistryEntry | null>;
  register(agent: LocalAgent, url: string): Promise<AgentRegistryEntry>;
}
