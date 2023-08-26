export enum Forms {
  email = 'email',
  password = 'password',
  firstName = 'firstName',
  lastName = 'lastName',
  date = 'date',
  street = 'street',
  postal = 'postal',
  city = 'city',
  streetForBilling = 'streetForBilling',
  postalForBilling = 'postalForBilling',
  cityForBilling = 'cityForBilling',
  country = 'country',
}

export enum Pages {
  signup = '/signup',
  login = '/login',
  main = '/main',
  error = '/error',
  product = '/product/:productKey',
  default = '/',
}

export enum Variant {
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  warning = 'warning',
  danger = 'danger',
  info = 'info',
  light = 'light',
  dark = 'dark',
  link = 'link',
}
