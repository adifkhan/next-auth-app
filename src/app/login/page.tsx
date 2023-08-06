'use client';

import React, { useState } from 'react';
import styles from '@/app/styles/login.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const onLogin = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      router.push('/');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className={styles.login}>
      <h1 className={styles.heading}>Login</h1>
      <form onSubmit={onLogin}>
        <div className={styles.inputgroup}>
          <label htmlFor=''>Email</label>
          <input
            type='text'
            placeholder='Enter Email*'
            className={styles.inputfield}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className={styles.inputgroup}>
          <label htmlFor=''>Password</label>
          <input
            type='password'
            autoComplete='user-password'
            placeholder='Passoerd*'
            className={styles.inputfield}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className={styles.buttonbox}>
          <input
            type='submit'
            value={loading ? 'Loading...' : 'Login'}
            className={styles.submitbutton}
            disabled={user.email.length < 6 || user.password.length < 6}
          />
        </div>
      </form>
      <p className='errormessage'>{error}</p>
      <p>
        New to Next Auth?{' '}
        <Link href='/signup' className={styles.link}>
          Sign Up
        </Link>
      </p>
    </section>
  );
};

export default Login;
