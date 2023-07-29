import React from 'react';
import styles from '@/app/styles/header.module.css';
import Link from 'next/link';

const Header = () => {
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
            <Link href='/contact' className={styles.links}>
              Contact
            </Link>
          </li>
          <li>
            <Link href='/login' className={styles.links}>
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
