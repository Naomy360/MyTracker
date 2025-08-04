import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5050/api/contact', { name, email, message });
      setSuccess('Contact added successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('Error adding contact:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Recruiter Contact</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required />
        <button type="submit">Save Contact</button>
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

const styles = {
  container: { marginTop: '20px', padding: '20px', background: '#f1f1f1', borderRadius: '8px' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' }
};

export default ContactForm;
