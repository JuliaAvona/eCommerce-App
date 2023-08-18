import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthorized, unAuthorize } from '../../utils/storage';
import Link from '../Link/Link';
import { Pages } from '../../types/enums';

const Loginlink = () => {
  const navigate = useNavigate();
  const logOutHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    unAuthorize();
    navigate(Pages.login);
  };

  return isAuthorized() ? (
    <Link href={Pages.login} onClick={(e) => logOutHandler(e)}>
      Logout
    </Link>
  ) : (
    <Link href={Pages.login}>Login</Link>
  );
};

export default Loginlink;
