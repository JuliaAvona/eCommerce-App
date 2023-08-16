import iso3311a2 from 'iso-3166-1-alpha-2';
import { postcodeValidator } from 'postcode-validator';

export function emailValidation(str: string): string {
  if (str === '') return 'email empty';
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(str)) return 'Email address must be properly formatted (e.g., user@example.com)';
  return str;
}

export function passwordValidation(str: string): string {
  if (str === '') return 'password empty';
  if (str.length < 8) return 'Password must be at least 8 characters long';
  if (!/[A-Z]/.test(str)) return 'Password must contain at least one uppercase letter (A-Z)';
  if (!/[a-z]/.test(str)) return 'Password must contain at least one lowercase letter (a-z)';
  if (!/\d/.test(str)) return 'Password must contain at least one digit (0-9)';
  if (/^\s+|\s+$/.test(str)) return 'Password cannot contain spaces';
  return str;
}

export function nameValidation(str: string): string {
  if (!str) return 'Fill in the field';
  if (!/^[a-zA-Z]+$/.test(str)) return 'English letters only';
  if (/\d/.test(str)) return 'Must not contain numbers';
  return str;
}

export function dateValidation(str: string): string {
  if (!str) return 'Fill in the field';
  const today = new Date();
  const inputDate = new Date(str);
  const ageDiff = today.getFullYear() - inputDate.getFullYear();
  if (ageDiff < 13) return `You must be over 13 years old`;
  return str;
}

export function streetValidation(str: string): string {
  if (!str) return 'Fill in the field';
  return str;
}

export function cityValidation(str: string): string {
  if (!str) return 'Fill in the field';
  if (!/^[a-zA-Z]+$/.test(str)) return 'Must contain only English letters';
  if (/\d/.test(str)) return 'Must not contain numbers';
  return str;
}

export function postalValidation(str: string, countryCode: string): string {
  try {
    return postcodeValidator(str, countryCode) ? str : 'Index is incorrect';
  } catch {
    // TODO: Поискать другой валидатор
    return 'Country region does not exist';
  }
}

export function countryValidation(str: string): string {
  return iso3311a2.getCountry(str) ? str : 'Choose the country';
}
