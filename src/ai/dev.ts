// This file is only used for local development
// Next.js automatically loads .env.local, so dotenv is not needed in production
if (process.env.NODE_ENV === 'development') {
  try {
    // Dynamic import to avoid build errors
    require('dotenv').config();
  } catch (e) {
    // Dotenv not available, continue without it
    console.log('Running without dotenv - using Next.js env variables');
  }
}

import '@/ai/flows/ai-chatbot-student.ts';
import '@/ai/flows/summarize-materials.ts';