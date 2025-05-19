
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Root route to avoid "Cannot GET /" error
app.get('/', (req, res) => {
  res.send('EduQuest backend is up and running!');
});

// OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// AI route
app.post('/ask', async (req, res) => {
  const { question } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: question }],
    });
    res.json({ response: completion.data.choices[0].message.content });
  } catch (error) {
    console.error(error); // log full error for debugging
    res.status(500).send('Error generating response');
  }
});

// Start the server
app.listen(3001, () => console.log('Server running on port 3001'));
