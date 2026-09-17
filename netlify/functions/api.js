const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const apiRoutes = require('../../routes/api');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Support both /api and /.netlify/functions/api prefixes
app.use('/api', apiRoutes);
app.use('/.netlify/functions/api', apiRoutes);
app.use('/', apiRoutes);

module.exports.handler = serverless(app);
