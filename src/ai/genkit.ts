import { Genkit } from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/googleai';

export const ai = new Genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-1.5-flash',
});
