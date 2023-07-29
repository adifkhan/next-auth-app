import Link from 'next/link';
import React from 'react';
import styles from '@/app/styles/login.module.css';

const page = () => {
  return (
    <div>
      <section className={styles.login}>
        <h1 className={styles.heading}>Login</h1>
        <form>
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
          <div className={styles.button}>
            <input
              type='submit'
              value='Login'
              className={styles.submitbutton}
            />
          </div>
        </form>
        <p>
          New to Next Auth?{' '}
          <Link href='/signup' className={styles.link}>
            Sign Up
          </Link>
        </p>
      </section>
    </div>
  );
};

export default page;
