import fetch from 'node-fetch';
import { Request, Response } from 'express';
import * as functions from 'firebase-functions';

// Firebase Cloud Function HTTP handler to proxy AI requests.
// Keep your GEMINI_API_KEY in Firebase environment (use `firebase functions:config:set gemini.key="..."` or use the new env vars in console).

export const aiProxy = functions.https.onRequest(async (req: Request, res: Response) => {
  if (req.method !== 'POST') {
    res.status(405).send({ error: 'Method not allowed' });
    return;
  }

  const { prompt } = req.body || {};
  if (!prompt) {
    res.status(400).send({ error: 'Missing prompt' });
    return;
  }

  // Prefer storing key in functions config or environment variable
  // For older Firebase CLI: functions.config().gemini.key
  const apiKey = process.env.GEMINI_API_KEY || functions.config?.().gemini?.key;
  if (!apiKey) {
    res.status(500).send({ error: 'AI API key not configured on server' });
    return;
  }

  try {
    const response = await fetch('https://api.generativeai.google/v1beta/models/gemini-2.5-flash:generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ prompt }),
    });

    const json = await response.json();
    const result = json?.candidates?.[0]?.content || json?.output || json?.text || JSON.stringify(json);
    res.status(200).send({ result });
  } catch (err: any) {
    console.error('AI proxy error', err);
    res.status(500).send({ error: 'AI proxy failed' });
  }
});
