import iso3311a2 from 'iso-3166-1-alpha-2';
import { postcodeValidator } from 'postcode-validator';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function emailValidation(str: string): string {
  if (str === '') return 'Email empty';
  if (!emailRegex.test(str)) return 'Email address must be properly formatted (e.g., user@example.com)';
  if (!str.includes('@')) return 'Email address must contain an "@" symbol separating local part and domain name';
  if (/^\s+|\s+$/.test(str)) return 'Email address must not contain leading or trailing whitespace';
  if (!str.includes('.')) return 'Email address must contain a domain name (e.g., example.com)';
  return '';
}

export function passwordValidation(str: string): string {
  if (str === '') return 'Password empty';
  if (str.length < 8) return 'Password must be at least 8 characters long';
  if (!/[A-Z]/.test(str)) return 'Password must contain at least one uppercase letter (A-Z)';
  if (!/[a-z]/.test(str)) return 'Password must contain at least one lowercase letter (a-z)';
  if (!/\d/.test(str)) return 'Password must contain at least one digit (0-9)';
  if (/^\s+|\s+$/.test(str)) return 'Password cannot contain spaces';
  return '';
}

export function nameValidation(str: string): string {
  if (!str) return 'Fill in the field';
  if (!/^[a-zA-Z]+$/.test(str)) return 'English letters only';
  if (/\d/.test(str)) return 'Must not contain numbers';
  return '';
}

export function dateValidation(str: string): string {
  if (!str) return 'Fill in the field';
  const today = new Date();
  const inputDate = new Date(str);
  const ageDiffYears = today.getFullYear() - inputDate.getFullYear();
  const birthMonth = inputDate.getMonth();
  const currentMonth = today.getMonth();

  // Если текущий месяц меньше месяца рождения или равен ему, и день текущего месяца меньше дня рождения,
  // то возраст еще не наступил, даже если разница в годах достаточно большая.
  if (
    (currentMonth < birthMonth || (currentMonth === birthMonth && today.getDate() < inputDate.getDate())) &&
    ageDiffYears <= 13
  )
    return `You must be over 13 years old`;

  if (ageDiffYears > 130) return `Too high age`;
  if (Number.isNaN(ageDiffYears)) return `Invalid number`;
  return '';
}

export function streetValidation(str: string): string {
  if (!str) return 'Fill in the field';
  return '';
}

export function cityValidation(str: string): string {
  if (!str) return 'Fill in the field';
  if (!/^[a-zA-Z]+$/.test(str)) return 'Must contain only English letters';
  if (/\d/.test(str)) return 'Must not contain numbers';
  return '';
}

export function postalValidation(str: string, countryCode: string): string {
  try {
    return postcodeValidator(str, countryCode) ? '' : 'Index is incorrect';
  } catch {
    // TODO: Поискать другой валидатор
    return 'Country region does not exist';
  }
}

export function countryValidation(str: string): string {
  return iso3311a2.getCountry(str) ? '' : 'Choose the country';
}
