import axios from 'axios';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const GOOGLE_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export async function generateGiftSuggestions(prompt: string) {
  if (!GOOGLE_API_KEY) {
    throw new Error('Google API key is not configured');
  }

  try {
    const enhancedPrompt = `Generate exactly 3 thoughtful gift suggestions based on these preferences: ${prompt}

For each suggestion, provide only:
1. Gift Name
2. Why It's Perfect
3. Price Range
4. Where to Purchase

Keep responses concise and elegant. Format as:

1. [Gift Name]
Why It's Perfect: [1-2 sentences]
Price Range: [Amount]
Where to Purchase: [2-3 specific retailers]

2. [Continue format for remaining suggestions...]`;

    const response = await axios.post(
      `${GOOGLE_API_URL}?key=${GOOGLE_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: enhancedPrompt
          }]
        }]
      }
    );

    if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from API');
    }

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating suggestions:', error);
    throw error;
  }
}