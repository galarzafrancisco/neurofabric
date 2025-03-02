import { LocalAgent } from '../agents/LocalAgent';
import { RemoteAgent } from '../agents/RemoteAgent';
import { IAgent } from '../../../../interfaces/typescript/IAgent';
import { IAgentRegistry } from '../../../../interfaces/typescript/IAssetRegistry';
import { AgentConfig } from '../../../../interfaces/typescript/AgentConfig';
import { LocalAgentRegistry } from './AgentRegistry/LocalAgentRegistry';
import { Server } from './Server/Server';

class NeuroFabric {
    private registry: IAgentRegistry;
    private localMode: boolean;
    private baseUrl: string;
    private port: number;
    private server: Server;

    constructor(port: number, registryUrl?: string) {
        this.port = port || 8080;
        if (registryUrl) {
            throw "Not implemented";
        } else {
            this.baseUrl = `http://localhost:${this.port}`;
            this.registry = new LocalAgentRegistry();
        }
        this.server = new Server(this.port);
    }

    createAgent(config: AgentConfig): LocalAgent {
        return new LocalAgent(config);
    }

    async findAgent(config: { name: string; version: string }): Promise<IAgent> {
        const agentInfo = await this.registry.find(config.name, config.version);
        if (!agentInfo) {
            throw new Error(`Agent ${config.name} not found.`);
        }
        return new RemoteAgent(agentInfo);
    }

    private makeUrl(agent: LocalAgent): string {
        return `${this.baseUrl}/${agent.name}/${agent.version}`;
    }

    async register(agent: LocalAgent): Promise<void> {
        const url = this.makeUrl(agent);
        const remoteAgent = await this.registry.register(agent, url);
        console.log(`registered agent: ${JSON.stringify(remoteAgent, null, 2)}`);
        this.server.registerAgent(agent);
        return;
    }

    serve() {
        this.server.serve();
    }
}

export { NeuroFabric };
