export interface ISignUp {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export interface ISignUpError {
  type: string;
  message: string;
}
export interface ICountry {
  [country: string]: string;
}

export interface IForm {
  email: IFormData;
  password: IFormData;
  firstName: IFormData;
  lastName: IFormData;
  date: IFormData;
  street: IFormData;
  postal: IFormData;
  city: IFormData;
  streetForBilling: IFormData;
  postalForBilling: IFormData;
  cityForBilling: IFormData;
  country: IFormData;
}

export interface IFormData {
  data: string;
  error: string;
}

export interface IResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}
