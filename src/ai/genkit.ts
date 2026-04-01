// Placeholder AI configuration
// Note: Full AI features require proper Genkit setup with API keys
// This is a simplified version to allow the app to build successfully

export const ai = {
  generate: async ({ prompt, model, history }: any) => {
    // Mock implementation - replace with actual Genkit setup when needed
    return {
      text: 'AI features are currently disabled. Please configure Genkit properly.',
    };
  },
  definePrompt: (config: any) => {
    return async (input: any) => {
      return {
        output: { summary: 'Summary feature currently disabled.' },
      };
    };
  },
  defineFlow: (config: any, handler: any) => {
    return handler;
  },
};
