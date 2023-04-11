import glob from 'glob';
import fs from 'fs';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { HNSWLib } from 'langchain/vectorstores';
import { OpenAIEmbeddings } from 'langchain/embeddings';

const run = async (): Promise<void> => {
  try {
    const data: string[] = [];
    const files: string[] = await new Promise((resolve, reject) =>
      glob('llm/training/**/*.md', (err, files) =>
        err ? reject(err) : resolve(files),
      ),
    );

    for (const file of files) {
      data.push(fs.readFileSync(file, 'utf-8'));
    }

    console.log(
      `Added ${files.length} files to data. Splitting text into chunks...`,
    );

    const textSplitter = new CharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
      separator: '\n',
    });

    let docs: string[] = [];
    for (const d of data) {
      const docOutput: string[] = textSplitter.splitText(d);
      docs = [...docs, ...docOutput];
    }

    console.log('Initializing Store...');

    const store = await HNSWLib.fromTexts(
      docs,
      docs.map((_, i) => ({ id: i + 1 })),
      new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY || '',
      }),
    );

    console.log('Saving Vectorstore');

    store.save('llm/vectorStore');

    console.log('VectorStore saved');
  } catch (err) {
    console.log(err);
    throw new Error('Failed to initialize vector store');
  }
};

(async () => {
  await run();
})();
