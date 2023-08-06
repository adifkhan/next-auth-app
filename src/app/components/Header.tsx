'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/app/styles/header.module.css';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getauth = async () => {
      const res = await axios.get('/api/users/auth');
      if (res.data.success) {
        setUser(res.data.user);
      } else {
        router.push('/login');
      }
    };
    getauth();
  }, [router]);

  const logOut = async () => {
    try {
      await axios.get('/api/users/logout');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.navtittle}>NEXT AUTH</h1>
      </div>
      <nav>
        <ul className={styles.navlist}>
          <li>
            <Link href='/' className={styles.links}>
              Home
            </Link>
          </li>
          <li>
            <Link href='/profile' className={styles.links}>
              Profile
            </Link>
          </li>
          {!user ? (
            <li>
              <Link href='/login' className={styles.links}>
                Login
              </Link>
            </li>
          ) : (
            <li>
              <button onClick={logOut} className={styles.submitbutton}>
                Log Out
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
