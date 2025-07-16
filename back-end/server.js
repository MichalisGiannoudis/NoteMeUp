import 'dotenv/config';
import app from './src/app.js';

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Backend API Ready On Port: ${port}`);
});