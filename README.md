# Payment Entry Dashboard

A modern web application for submitting payment entries, storing them in Google Sheets, and sending instant SMS notifications using Twilio.  
Built with React (frontend) and Node.js/Express (backend).

---

## 🚀 Features

- 🌟 Beautiful, responsive payment entry form
- 📝 Stores all entries in a Google Spreadsheet
- 📲 Sends SMS notifications for each new entry (via Twilio)
- 🔒 Secure backend with environment-based configuration
- ⚡ Real-time feedback for users
- 🛡️ CORS and input validation enabled

---

## 🏗️ Project Structure

```
paymentsheet/
  ├── backend/         # Node.js/Express backend API
  │   ├── index.js
  │   ├── backendserviceaccount.json
  │   ├── package.json
  │   └── .env
  └── frontend/        # React frontend
      ├── src/
      ├── public/
      └── package.json
```

---

## ⚙️ Setup Instructions

### 1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/payment-entry-dashboard.git
cd payment-entry-dashboard
```

### 2. **Backend Setup**

- Go to the backend directory:
  ```bash
  cd backend
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Create a `.env` file in the backend directory:
  ```env
  PORT=5000
  SPREADSHEET_ID=your_google_sheet_id
  GOOGLE_SERVICE_ACCOUNT_KEY=./backendserviceaccount.json
  TWILIO_ACCOUNT_SID=your_twilio_account_sid
  TWILIO_AUTH_TOKEN=your_twilio_auth_token
  TWILIO_PHONE_NUMBER=your_twilio_phone_number
  RECIPIENT_PHONE_NUMBER=recipient_phone_number_with_country_code
  ```
- Place your Google service account JSON file as `backendserviceaccount.json` in the backend directory.
- **Share your Google Sheet with the service account email** (found in the JSON file).

- Start the backend server:
  ```bash
  node index.js
  ```

### 3. **Frontend Setup**

- Go to the frontend directory:
  ```bash
  cd ../frontend
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Create a `.env` file in the frontend directory:
  ```env
  REACT_APP_API_URL=http://localhost:5000/payment
  ```
- Start the frontend app:
  ```bash
  npm start
  ```

---

## 🛡️ Security Notes

- **Never commit your `.env` or service account JSON to public repos.**
- Use environment variables for all sensitive credentials.

---

## 🛠️ Technologies Used

- **Frontend:** React, CSS
- **Backend:** Node.js, Express
- **Database:** Google Sheets API
- **Notifications:** Twilio SMS API

---

## 📱 Example SMS

> Payment Entry: Name: John Doe, Amount: 500

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request


## ⭐ Acknowledgements

- [Google Sheets API](https://developers.google.com/sheets/api)
- [Twilio SMS API](https://www.twilio.com/docs/sms)
- [React](https://react.dev/)
- [Express](https://expressjs.com/)

--- 
