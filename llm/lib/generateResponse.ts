import { OpenAI } from 'langchain/llms';
import { LLMChain, PromptTemplate } from 'langchain';
import { HNSWLib } from 'langchain/vectorstores';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import promptTemplate from './basePrompt';
import { GenerateParams } from './types';

// OpenAI Configuration
const model = new OpenAI({
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'text-davinci-003',
});

// Parse and initialize the Prompt
const prompt = new PromptTemplate({
  template: promptTemplate,
  inputVariables: ['history', 'context', 'prompt'],
});

// Create the LLM Chain
const llmChain = new LLMChain({
  llm: model,
  prompt,
});

/**
 * Generates a Response based on history and a prompt.
 * @param {string} history -
 * @param {string} prompt - Th
 */
const generateResponse = async ({ history, prompt }: GenerateParams) => {
  // Load the Vector Store from the `vectorStore` directory
  const store = await HNSWLib.load(
    'vectorStore',
    new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    }),
  );

  // Search for related context/documents in the vectorStore directory
  const data = await store.similaritySearch(prompt, 1);

  const context: string[] = [];
  data.forEach((item, i) => {
    context.push(`Context:\n${item.pageContent}`);
  });

  return await llmChain.call({
    prompt,
    context: context.join('\n\n'),
    history,
  });
};

export default generateResponse;
