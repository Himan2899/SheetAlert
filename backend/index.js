require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
// Middleware to parse JSON
app.use(express.json());

// Google Sheets and Twilio integration
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const Twilio = require('twilio');

// Google Sheets setup
const SHEET_ID = process.env.SPREADSHEET_ID;
const SHEET_TAB = 'Sheet1';
const SERVICE_ACCOUNT_FILE = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

// Twilio setup
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
  throw new Error('Twilio credentials are missing. Please set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in your .env file.');
}

const TWILIO_PHONE_NUMBER = '+15714894513';
const RECIPIENT_PHONE_NUMBER = '+919278016080';
const twilioClient = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

async function appendToSheet(name, amount) {
  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth: await auth.getClient() });
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_TAB}!A:B`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[name, amount, new Date().toLocaleString()]],
    },
  });
}

async function sendSMS(name, amount) {
  const message = `Payment Entry: Name: ${name}, Amount: ${amount}`;
  await twilioClient.messages.create({
    body: message,
    from: TWILIO_PHONE_NUMBER,
    to: RECIPIENT_PHONE_NUMBER,
  });
}

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Handle payment submissions
app.post('/payment', async (req, res) => {
  const { name, amount } = req.body;
  if (!name || !amount) {
    return res.status(400).json({ error: 'Name and amount are required.' });
  }
  try {
    await appendToSheet(name, amount);
    await sendSMS(name, amount);
    res.json({ message: 'Payment received, entry added to sheet, and SMS sent.' });
  } catch (err) {
    console.error('Error processing payment:', err);
    res.status(500).json({ error: 'Failed to process payment.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
}); 