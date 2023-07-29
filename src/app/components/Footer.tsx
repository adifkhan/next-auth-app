import React from 'react';
import styles from '@/app/styles/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footertext}>
        Copyright &copy; {new Date().getFullYear()}, All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
