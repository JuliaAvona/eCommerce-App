import { IResponse } from '../types/interfaces';

export const saveData = (data: IResponse): void => {
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
};

export const isAuth = (): boolean => {
  if (localStorage.getItem('access_token') !== null && localStorage.getItem('refresh_token') !== null) {
    console.log('You are logged in');
    return true;
  }
  return false;
};

export const clearData = (): void => {
  console.log('You are not authorized');
  localStorage.clear();
};
