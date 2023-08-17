import { MouseEventHandler } from 'react';
import { IResponse } from '../types/interfaces';

const saveDataInLockalStorage = (data: IResponse): void => {
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
};

export const isAuthorized = (): boolean => {
  if (localStorage.getItem('access_token') !== null && localStorage.getItem('refresh_token') !== null) {
    return true;
    console.log('you autorized');
  }
  return false;
};

export const unAuthorize = (): void => {
  localStorage.clear();
  console.log('unAuthorize');
};

export default saveDataInLockalStorage;
