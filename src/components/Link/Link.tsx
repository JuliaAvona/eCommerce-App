import React, { FC, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import styles from './Link.module.scss';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}
const MyLink: FC<LinkProps> = ({ href, children, onClick }) => {
  return (
    <Link to={href} className={styles.a} onClick={onClick}>
      {children}
    </Link>
  );
};
export default MyLink;
