import React, { FC, MouseEventHandler } from 'react';
import styles from './Link.module.scss';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}
const Link: FC<LinkProps> = ({ href, onClick, children }) => {
  return (
    <a onClick={onClick} className={styles.a} href={href}>
      {children}
    </a>
  );
};
export default Link;
