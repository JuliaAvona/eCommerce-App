import iso3311a2 from 'iso-3166-1-alpha-2';
import { postcodeValidator } from 'postcode-validator';

export function emailValidation(str: string): string {
  if (str === '') return 'Заполните поле';
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(str)) return 'Некорректный EMail';
  return str;
}

export function passwordValidation(str: string): string {
  if (str === '') return 'Заполните поле';
  if (str.length < 8) return 'Минимум 8 символов';
  if (!/[A-Z]/.test(str)) return 'Минимум 1 заглавную букву';
  if (!/[a-z]/.test(str)) return 'Минимум 1 строчную букву';
  if (!/\d/.test(str)) return 'Минимум 1 цифру';
  return str;
}

export function nameValidation(str: string): string {
  if (!str) return 'Заполните поле';
  if (!/^[a-zA-Z]+$/.test(str)) return 'Только английские буквы';
  if (/\d/.test(str)) return 'Не должно содержать цифр';
  return str;
}

export function dateValidation(str: string): string {
  if (!str) return 'Заполните поле';
  const today = new Date();
  const inputDate = new Date(str);
  const ageDiff = today.getFullYear() - inputDate.getFullYear();
  if (ageDiff < 13) return `Вы должны быть старшe 13 лет`;
  return str;
}

export function streetValidation(str: string): string {
  if (!str) return 'Заполните поле';
  return str;
}

export function cityValidation(str: string): string {
  if (!str) return 'Заполните поле';
  if (!/^[a-zA-Z]+$/.test(str)) return 'Должен содержать только английские буквы';
  if (/\d/.test(str)) return 'Не должно содержать цифр';
  return str;
}

export function postalValidation(str: string, countryCode: string): string {
  try {
    return postcodeValidator(str, countryCode) ? str : 'Индекс некорректен';
  } catch {
    // TODO: Поискать другой валидатор
    return 'Региона страны не существует';
  }
}

export function countryValidation(str: string): string {
  return iso3311a2.getCountry(str) ? str : 'Выберите страну';
}
