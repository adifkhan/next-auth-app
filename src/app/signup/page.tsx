'use client';

import React, { useState } from 'react';
import styles from '@/app/styles/signup.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SignUp = () => {
  const router = useRouter();
  const [confirmPass, setConfirmPass] = useState('');
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const onSignUp = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      router.push('/login');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className={styles.signup}>
      <h1 className={styles.heading}>Sign Up</h1>
      <form onSubmit={onSignUp}>
        <div className={styles.inputgroup}>
          <label htmlFor=''>Name</label>
          <input
            type='text'
            placeholder='User Name*'
            className={styles.inputfield}
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
          />
        </div>
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
            placeholder='Password*'
            className={styles.inputfield}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
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
        <div>
          <input
            type='checkbox'
            name='terms'
            id='terms'
            onClick={() => setTerms(!terms)}
          />
          <label htmlFor='terms'> agree to terms and conditions</label>
        </div>
        <div className={styles.buttonbox}>
          <input
            type='submit'
            value={loading ? 'Loading...' : 'Sign Up'}
            className={styles.submitbutton}
            disabled={
              terms === false ||
              user.password !== confirmPass ||
              confirmPass === ''
            }
          />
        </div>
      </form>
      <p className='errormessage'>{error}</p>
      <p>
        Already have an account?{' '}
        <Link href='/login' className={styles.link}>
          Login
        </Link>
      </p>
    </section>
  );
};

export default SignUp;
