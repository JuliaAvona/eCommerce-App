import { IResponse } from '../types/interfaces';

const saveDataInLockalStorage = (data: IResponse): void => {
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
};

export default saveDataInLockalStorage;
