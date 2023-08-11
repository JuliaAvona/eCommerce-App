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

export interface IFormField {
  data: string;
  error: string;
}
