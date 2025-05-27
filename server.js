// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/leads', async (req, res) => {
  const { name, email, company, message } = req.body;

  if (!name || !email || !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email)) {
    return res.status(400).json({ error: 'Invalid name or email' });
  }

  try {
    await axios.post('https://your-n8n-instance/webhook/leads', {
      name, email, company, message
    });

    res.status(200).json({ message: 'Lead forwarded to n8n' });
  } catch (error) {
    console.error('Error sending to n8n:', error.message);
    res.status(500).json({ error: 'Failed to send lead' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
