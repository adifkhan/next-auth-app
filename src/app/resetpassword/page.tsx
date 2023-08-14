'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '@/app/styles/resetpass.module.css';

const ResetPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '');
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);

      if (token.length > 0) {
        const response = await axios.post('/api/users/resetpassword', {
          token,
          password,
        });
        if (response.data.success) {
          alert(response.data.message);
          setMessage(response.data.message);
          router.push('/');
        } else {
          setMessage(response.data.message);
        }
      }
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputgroup}>
          <label htmlFor=''>New Password</label>
          <input
            type='password'
            autoComplete='user-password'
            placeholder='New Password*'
            className={styles.inputfield}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.inputgroup}>
          <label htmlFor=''>Confirm Password</label>
          <input
            type='password'
            autoComplete='user-password'
            placeholder='Confirm Password*'
            className={styles.inputfield}
            onChange={(e) => setConfirmPass(e.target.value)}
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
            value={loading ? 'Loading...' : 'Reset'}
            className={styles.submitbutton}
            disabled={password !== confirmPass || confirmPass === ''}
          />
        </div>
      </form>
    </section>
  );
};

export default ResetPassword;
