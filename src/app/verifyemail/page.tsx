'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from '@/app/styles/verification.module.css';

const VerifyEmail = () => {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState(
    'Please wait.... verifing your email!'
  );
  const router = useRouter();

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '');
  }, []);

  useEffect(() => {
    const verifyemail = async () => {
      if (token.length > 0) {
        const response = await axios.post('/api/users/verifyemail', { token });
        if (response.data.success) {
          alert(response.data.message);
          setMessage(response.data.message);
          router.push('/');
        } else {
          setMessage(response.data.message);
        }
      }
    };
    verifyemail();
  }, [token, router]);

  return (
    <div>
      <h2 className={styles.message}>{message}</h2>
    </div>
  );
};

export default VerifyEmail;
