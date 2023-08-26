import { IResponse } from '../types/interfaces';

export const saveData = (data: IResponse): void => {
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
};

export const saveAnonimData = (data: IResponse): void => {
  localStorage.setItem('access_token_anonim', data.access_token);
  localStorage.setItem('refresh_token_anonim', data.refresh_token);
};

export const isAuth = (): boolean => {
  if (localStorage.getItem('access_token') !== null && localStorage.getItem('refresh_token') !== null) {
    return true;
  }
  return false;
};

export const clearData = (): void => {
  localStorage.clear();
};
