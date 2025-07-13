import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const res = await fetch(process.env.REACT_APP_API_URL || 'http://localhost:5000/api/entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, amount }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('Success! Entry submitted and SMS sent.');
        setName('');
        setAmount('');
      } else {
        setStatus(data.error || 'Submission failed.');
      }
    } catch (err) {
      setStatus('Network error.');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <form className="entry-form" onSubmit={handleSubmit}>
        <h2>Payment Entry</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
          min="1"
        />
        <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
        {status && <div className="status">{status}</div>}
      </form>
    </div>
  );
}

export default App;
