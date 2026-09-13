const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// API routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Catch-all route for SPA
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log('=====================================================');
  console.log('🇮🇳  KaushalSetu - Smart India Hackathon (SIH) Prototype');
  console.log(`🚀  Server running at: http://localhost:${PORT}`);
  console.log(`🤖  AI Model: ${process.env.GEMINI_MODEL || 'gemini-3.6-flash'}`);
  console.log('=====================================================');
});
