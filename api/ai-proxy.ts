import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

// This is a simple Vercel serverless function example that proxies AI requests
// Keep your API key in the deployment environment (e.g., Vercel dashboard env vars)

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { prompt } = req.body || {};
  if (!prompt) {
    res.status(400).json({ error: 'Missing prompt' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'AI API key not configured on server' });
    return;
  }

  try {
    // Example using Google GenAI REST endpoint. Adjust to your provider's API shape.
    const response = await fetch('https://api.generativeai.google/v1beta/models/gemini-2.5-flash:generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt,
        // Add provider-specific request body here. This is illustrative.
      }),
    });

    const json = await response.json();

    // Extract text from provider response (adjust as needed)
    const result = json?.candidates?.[0]?.content || json?.output || json?.text || JSON.stringify(json);

    res.status(200).json({ result });
  } catch (err: any) {
    console.error('AI proxy error', err);
    res.status(500).json({ error: 'AI proxy failed' });
  }
}
