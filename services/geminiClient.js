const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const PRIMARY_MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash';

function cleanJson(rawText) {
  if (!rawText) return null;
  let text = rawText.trim();
  
  if (text.startsWith('```')) {
    text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  }
  
  const firstBrace = text.indexOf('{');
  const firstBracket = text.indexOf('[');
  
  let startIdx = -1;
  let endIdx = -1;
  
  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    startIdx = firstBrace;
    endIdx = text.lastIndexOf('}');
  } else if (firstBracket !== -1) {
    startIdx = firstBracket;
    endIdx = text.lastIndexOf(']');
  }
  
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    text = text.substring(startIdx, endIdx + 1);
  }
  
  try {
    return JSON.parse(text);
  } catch (err) {
    const relaxed = text.replace(/,\s*([}\]])/g, '$1');
    return JSON.parse(relaxed);
  }
}

async function callGemini(prompt, model = PRIMARY_MODEL) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 4096,
          responseMimeType: 'application/json'
        }
      })
    });

    if (response.status === 404 && model !== 'gemini-3.6-flash') {
      console.warn(`Model ${model} returned 404. Falling back to gemini-3.6-flash...`);
      return callGemini(prompt, 'gemini-3.6-flash');
    }

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`Gemini API error (${response.status}): ${errBody}`);
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      throw new Error('Empty response received from Gemini API');
    }
    
    return cleanJson(candidateText);
  } catch (error) {
    console.error(`Error in callGemini (${model}):`, error.message);
    throw error;
  }
}

module.exports = { callGemini, cleanJson };
