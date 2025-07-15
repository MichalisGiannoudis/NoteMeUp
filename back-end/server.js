require('dotenv').config();

const app = require('./src/app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () =>{
  console.log(`Server running on http://localhost:${PORT}`);
});