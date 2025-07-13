// frontend/netlify/functions/payment.js

exports.handler = async function(event, context) {
  const { google } = require('googleapis');
  const twilio = require('twilio');

  // Helper: Parse service account key from env
  function getGoogleServiceAccount() {
    return JSON.parse(process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_KEY);
  }

  // Append to Google Sheet
  async function appendToSheet(name, amount) {
    const auth = new google.auth.GoogleAuth({
      credentials: getGoogleServiceAccount(),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.REACT_APP_SPREADSHEET_ID;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:B',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name, amount, new Date().toLocaleString()]],
      },
    });
  }

  // Send SMS via Twilio
  async function sendSMS(name, amount) {
    const client = twilio(
      process.env.REACT_APP_TWILIO_ACCOUNT_SID,
      process.env.REACT_APP_TWILIO_AUTH_TOKEN
    );
    const from = process.env.REACT_APP_TWILIO_PHONE_NUMBER;
    const to = process.env.REACT_APP_RECIPIENT_PHONE_NUMBER;

    await client.messages.create({
      body: `Payment received from ${name}: ₹${amount}`,
      from,
      to,
    });
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, amount } = JSON.parse(event.body || '{}');
  if (!name || !amount) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Name and amount are required.' })
    };
  }

  try {
    await appendToSheet(name, amount);
    await sendSMS(name, amount);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Payment received, entry added to sheet, and SMS sent.' })
    };
  } catch (err) {
    console.error('Error processing payment:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process payment.' })
    };
  }
}; 