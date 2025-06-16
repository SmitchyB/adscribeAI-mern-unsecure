// backend/server.js

const express = require('express'); // Import Express.js for building the server
const cors = require('cors'); // Import CORS middleware to handle cross-origin requests
const app = express();  // Create an instance of an Express application
const PORT = 5001; // Define the port on which the server will listen

// Middleware
app.use(cors()); // Use CORS to allow cross-origin requests from the frontend
app.use(express.json()); // Use JSON middleware to parse incoming JSON requests

// --- THIS IS THE VULNERABLE ENDPOINT ---
app.post('/api/generate', async (req, res) => {
  const { productName, keywords } = req.body;

  // --- THIS IS THE INTENTIONAL VULNERABILITY ---
  // The secret OpenAI API key is hardcoded directly in the source code.
  // In a real application, this is a major security risk.
  const OPENAI_API_KEY = 'FakeAPIKeyGoesHere'; // <--- REPLACE WITH YOUR OPENAI API KEY TO SEE THE APPLICATION FUNCTION


  // We construct the prompt to send to the AI
  const prompt = `Write a short, catchy, and professional product description for a "${productName}" that highlights these keywords: "${keywords}".`;

  // try to call the OpenAI API to generate a product description
  try {
    // Make a POST request to the OpenAI API with the constructed prompt
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // The hardcoded key is used in the authorization header
        'Authorization': `Bearer ${OPENAI_API_KEY}` 
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Specify the model to use
        messages: [{ role: "user", content: prompt }], // The prompt is sent as a message from the user
        max_tokens: 100, // Limit the length of the response
      }),
    });
    // Check if the response from OpenAI is OK
    if (!response.ok) {
      // If the API call fails, send back an error
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData); // Log the error from OpenAI
      throw new Error(`OpenAI API returned an error: ${response.statusText}`); // Throw an error to be caught in the catch block
    }

    const data = await response.json(); // Parse the JSON response from OpenAI
    
    // Extract the generated text from the OpenAI response
    const description = data.choices[0].message.content.trim();
    
    // Send the description back to the frontend
    res.json({ description });

  } catch (error) {
    console.error('Error in /api/generate:', error);
    res.status(500).json({ error: 'Failed to generate description.' });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});