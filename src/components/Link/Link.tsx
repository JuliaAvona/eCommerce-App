import React, { FC } from 'react';
import styles from './Link.module.css';

interface LinkProps {
  href: string;
  children: React.ReactNode;
}
const Link: FC<LinkProps> = ({ href, children }) => {
  return (
    <a className={styles.a} href={href}>
      {children}
    </a>
  );
};
export default Link;
