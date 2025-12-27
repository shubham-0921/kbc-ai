import Groq from 'groq-sdk';

class AIService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GROQ_API_KEY;
    console.log('Groq API Key loaded:', this.apiKey ? `${this.apiKey.substring(0, 10)}...` : 'NOT FOUND');
    if (!this.apiKey || this.apiKey === 'your_api_key_here') {
      console.error('Groq API key not configured. Please set VITE_GROQ_API_KEY in .env file');
    }
    this.client = new Groq({
      apiKey: this.apiKey,
      dangerouslyAllowBrowser: true // Required for client-side usage
    });
    this.model = 'llama-3.3-70b-versatile'; // Latest and most capable model
  }

  /**
   * Generate a trivia question for the given topic
   * @param {string} topic - The topic for the question
   * @returns {Promise<{question: string, options: string[], correctIndex: number, explanation: string}>}
   */
  async generateQuestion(topic) {
    console.log('Generating question for topic:', topic);

    // Add variety factors
    const timestamp = Date.now();
    const randomSeed = Math.floor(Math.random() * 1000);
    const questionStyles = [
      'recent news or trending event',
      'historical fact or milestone',
      'popular culture reference',
      'lesser-known interesting fact',
      'viral moment or controversy',
      'achievement or record',
      'personality or celebrity'
    ];
    const randomStyle = questionStyles[Math.floor(Math.random() * questionStyles.length)];

    const systemPrompt = `You are a trivia question generator for an Indian New Year party game. Generate UNIQUE, VARIED, and engaging India-specific questions. Never repeat similar questions. Each question should explore different aspects of the topic. Always respond with valid JSON only.`;

    const userPrompt = `Generate a UNIQUE trivia question about ${topic}.

CRITICAL - ENSURE VARIETY:
- Question ID: ${timestamp}-${randomSeed}
- Focus on: ${randomStyle}
- MUST explore DIFFERENT aspects than typical questions on this topic
- AVOID common/obvious questions - be creative and interesting!

CONTEXT: This is for an Indian audience at a New Year's Eve party. Make it relevant, fun, and engaging!

IMPORTANT GUIDELINES:
- For topics about "Current Affairs" or "Trending Topics 2024": Focus on major events from late 2024 and early 2025 in India
- For India-specific topics: Include cultural context, popular references, and local flavor
- For fun topics (alcohol, memes, etc.): Keep it light-hearted and party-appropriate
- Use Indian English and cultural references where relevant
- EXPLORE different angles: if topic is broad, pick a specific subtopic or personality
- Mix difficulty levels and question types

CRITICAL: Respond ONLY with valid JSON in this exact format (no markdown, no code blocks, just raw JSON):
{
  "question": "The question text",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctIndex": 0,
  "explanation": "Fun fact about the answer with Indian context"
}

Requirements:
- Clear and unambiguous question
- 4 plausible options that make sense for an Indian audience
- Only one correct answer
- Randomize correct answer position (don't always put it first)
- Medium difficulty - not too easy, not too obscure
- Party-appropriate and engaging
- For current events: Use recent major news from 2024-25
- MUST be DIFFERENT from common questions on this topic`;


    try {
      const response = await this._generateWithRetry(systemPrompt, userPrompt);
      console.log('Question generated successfully:', response);
      return response;
    } catch (error) {
      console.error('Error generating question:', error);
      throw new Error(`Failed to generate question: ${error.message}`);
    }
  }

  /**
   * Generate question with retry logic
   * @private
   */
  async _generateWithRetry(systemPrompt, userPrompt, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const completion = await this.client.chat.completions.create({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: userPrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1024,
          response_format: { type: 'json_object' } // Ensure JSON response
        });

        const content = completion.choices[0].message.content;
        const parsed = this._parseResponse(content);
        return parsed;
      } catch (error) {
        if (attempt === maxRetries) {
          throw error;
        }
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }

  /**
   * Parse and validate the AI response
   * @private
   */
  _parseResponse(content) {
    try {
      // Try to extract JSON from the response (in case there's extra text)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const parsed = JSON.parse(jsonMatch[0]);

      // Validate structure
      if (!parsed.question || typeof parsed.question !== 'string') {
        throw new Error('Invalid question field');
      }

      if (!Array.isArray(parsed.options) || parsed.options.length !== 4) {
        throw new Error('Invalid options field - must be array of 4 items');
      }

      if (typeof parsed.correctIndex !== 'number' ||
          parsed.correctIndex < 0 ||
          parsed.correctIndex > 3) {
        throw new Error('Invalid correctIndex - must be number between 0-3');
      }

      if (!parsed.explanation || typeof parsed.explanation !== 'string') {
        throw new Error('Invalid explanation field');
      }

      return parsed;
    } catch (error) {
      throw new Error(`Failed to parse response: ${error.message}`);
    }
  }
}

// Export singleton instance
export default new AIService();
