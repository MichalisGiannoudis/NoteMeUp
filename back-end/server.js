import 'dotenv/config';
import app from './src/app.js';
import crypto from 'crypto';

const port = process.env.PORT || 3001;
let jwtSecret = process.env.JWT_SECRET;

function generateSecureSecret(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

if (!jwtSecret || jwtSecret.length < 32) {
  jwtSecret = generateSecureSecret();
  process.env.JWT_SECRET = jwtSecret;
  
  if (process.env.NODE_ENV === 'production') {
    console.warn('Running in production with an auto-generated JWT secret.');
    console.warn('This will invalidate all existing tokens on server restart.');
  }
}

app.listen(port, () => {
  console.log(`Backend API Ready On Port: ${port}`);
});