import { ai as genkitAI } from '@genkit-ai/ai';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkitAI({
  plugins: [googleAI()],
  model: 'googleai/gemini-1.5-flash',
});
