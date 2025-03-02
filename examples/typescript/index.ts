import { NeuroFabric } from '../../sdk/typescript/neurofabric';
import { QuestionHandler } from '../../interfaces/typescript/QuestionHandler';

/**
 * Example: Setting up and using NeuroFabric.
 * This demonstrates how to create an agent, register it, serve it, and call it both locally and remotely.
 */

// Initialize NeuroFabric.
// Uses environment variables but can be configured with a specific port.
const neurofabric = new NeuroFabric(1234);

/**
 * Step 1: Create an Agent
 * The agent "joker" is created with a version and capabilities.
 */
const joker = neurofabric.createAgent({
    name: 'joker',
    version: 'v1',
    capabilities: 'tells funny jokes',
});

/**
 * Step 2: Define a Question Handler
 * This function processes incoming questions and returns a response.
 */
const questionHandler: QuestionHandler = async (question: string, history?: string[]): Promise<string> => {
    console.log(`Received question: ${question}`);
    return 'something funny';
};

// Attach the handler to the agent
joker.handleQuestion(questionHandler);

/**
 * Step 3: Register and Serve the Agent
 * The agent is registered so it becomes discoverable, and the server starts.
 */
await neurofabric.register(joker);
neurofabric.serve();

/**
 * Step 4: Ask a Question Locally
 * Since "joker" is a local agent, we can directly call `.ask()`.
 */
const joke = await joker.ask('tell me a joke');
console.log(`Joker's response: ${joke}`);

/**
 * Step 5: Find and Call the Agent Remotely
 * This demonstrates discovering an agent from the registry and calling it.
 */
const remoteJoker = await neurofabric.findAgent({
    name: 'joker',
    version: 'v1',
});

const response = await remoteJoker.ask('please help me!');
console.log(`Remote Joker's response: ${JSON.stringify(response, null, 2)}`);
// TODO: the remote agent respods in json {answer} while the local responds in raw text.
