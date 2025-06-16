// backend/server.js

const express = require('express');
const cors = require('cors');
// We need the built-in 'fetch' for making API calls
// If you are on an older Node.js version, you might need to install node-fetch
// const fetch = require('node-fetch'); 

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// --- THIS IS THE VULNERABLE ENDPOINT ---
app.post('/api/generate', async (req, res) => {
  const { productName, keywords } = req.body;

  // --- THIS IS THE INTENTIONAL VULNERABILITY ---
  // The secret OpenAI API key is hardcoded directly in the source code.
  // In a real application, this is a major security risk.
  const OPENAI_API_KEY = 'FakeAPIKeyGoesHere'; // <--- REPLACE WITH YOUR KEY
  // -------------------------------------------------

  // We construct the prompt to send to the AI
  const prompt = `Write a short, catchy, and professional product description for a "${productName}" that highlights these keywords: "${keywords}".`;

  console.log('Sending prompt to OpenAI:', prompt);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // The hardcoded key is used in the authorization header
        'Authorization': `Bearer ${OPENAI_API_KEY}` 
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 100, // Limit the length of the response
      }),
    });

    if (!response.ok) {
      // If the API call fails, send back an error
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      throw new Error(`OpenAI API returned an error: ${response.statusText}`);
    }

    const data = await response.json();
    // Extract the generated text from the OpenAI response
    const description = data.choices[0].message.content.trim();
    
    console.log('Received description from OpenAI:', description);
    
    // Send the description back to the frontend
    res.json({ description });

  } catch (error) {
    console.error('Error in /api/generate:', error);
    res.status(500).json({ error: 'Failed to generate description.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});