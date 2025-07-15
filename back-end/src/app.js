const express = require('express');
const cors = require('cors');
// const housesRoutes = require('./routes/housesRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// app.use('/houses', housesRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;