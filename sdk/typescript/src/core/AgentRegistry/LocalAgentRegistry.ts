import { LocalAgent } from '../../agents/LocalAgent';
import { AgentRegistryEntry } from '../../../../../interfaces/typescript/AgentRegistryEntry';
import { IAgentRegistry } from '../../../../../interfaces/typescript/IAssetRegistry';

class LocalAgentRegistry implements IAgentRegistry {
    private agents: Map<string, AgentRegistryEntry>;
    private port: number;

    constructor() {
        this.agents = new Map();
    }

    async find(name: string, version: string): Promise<AgentRegistryEntry | null> {
        const key = `${name}:${version}`;
        return this.agents.get(key) || null;
    }

    async register(agent: LocalAgent, url: string): Promise<AgentRegistryEntry> {
        const key = `${agent.name}:${agent.version}`;
        const entry = {
            name: agent.name,
            version: agent.version,
            capabilities: agent.capabilities,
            url: url,
        };
        this.agents.set(key, entry);
        return entry;
    }
}


export { LocalAgentRegistry };