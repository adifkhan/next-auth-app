'use client';
import React, { useState } from 'react';
import styles from '@/app/styles/forgotpassword.module.css';
import axios from 'axios';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/users/forgotpassword', { email });
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputgroup}>
          <label htmlFor=''>Email</label>
          <input
            type='text'
            placeholder='Enter Email*'
            className={styles.inputfield}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {message && (
          <div>
            <p className={styles.message}>{message}</p>
          </div>
        )}
        <div className={styles.buttonbox}>
          <input
            type='submit'
            value={loading ? 'Loading...' : 'send mail'}
            className={styles.submitbutton}
            disabled={email.length < 6}
          />
        </div>
      </form>
    </section>
  );
};

export default ForgotPassword;
