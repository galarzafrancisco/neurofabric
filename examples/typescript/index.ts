import { NeuroFabric } from '../../sdk/typescript/neurofabric';
import { QuestionHandler } from '../../interfaces/typescript/QuestionHandler';

// Connect to the agent registry.
// Uses env variables but can be configured to point to a specific
// instance of neurofabric.
const neurofabric = new NeuroFabric(1234);

// Create an agent
const joker = neurofabric.createAgent({
  name: 'joker',
  version: 'v1',
  capabilities: 'tells funny jokes',
});

const questionHandler: QuestionHandler = async (question: string, history?: string[]): Promise<string> => {
  console.log(`question received: ${question}`)
  return 'something funny';
};

joker.handleQuestion(questionHandler);
neurofabric.register(joker);
neurofabric.serve();

const joke = await joker.ask('tell me a joke');
console.log(joke);


// Call the agent via neurofabric
const remoteJoker = await neurofabric.findAgent({
  name: 'joker',
  version: 'v1',
});

const response = await remoteJoker.ask('please help me!');
console.log(response);
