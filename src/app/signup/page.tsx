'use client';

import React, { useState } from 'react';
import styles from '@/app/styles/signup.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const onSubmit = async () => {};
  return (
    <section className={styles.signup}>
      <h1 className={styles.heading}>Sign Up</h1>
      <form>
        <div className={styles.inputgroup}>
          <label htmlFor=''>Name</label>
          <input
            type='text'
            placeholder='User Name*'
            className={styles.inputfield}
          />
        </div>
        <div className={styles.inputgroup}>
          <label htmlFor=''>Email</label>
          <input
            type='text'
            placeholder='Enter Email*'
            className={styles.inputfield}
          />
        </div>
        <div className={styles.inputgroup}>
          <label htmlFor=''>Password</label>
          <input
            type='password'
            placeholder='Passoerd*'
            className={styles.inputfield}
          />
        </div>
        <div className={styles.inputgroup}>
          <label htmlFor=''>Confirm Password</label>
          <input
            type='password'
            placeholder='Confirm Password*'
            className={styles.inputfield}
          />
        </div>
        <div>
          <input type='checkbox' name='terms' id='' />
          <label htmlFor=''> agree to terms and conditions</label>
        </div>
        <div className={styles.button}>
          <input
            type='submit'
            value='Sign Up'
            className={styles.submitbutton}
          />
        </div>
      </form>
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
