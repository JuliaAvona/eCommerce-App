import React, { FC, useState, useEffect } from 'react';
import iso3311a2 from 'iso-3166-1-alpha-2';
import { Link, useNavigate } from 'react-router-dom';
import { ICountry, IFormField } from '../../types/interfaces';
import { getToken, login, signup } from '../../api';
import { Forms } from '../../types/enums';
import {
  cityValidation,
  countryValidation,
  dateValidation,
  emailValidation,
  nameValidation,
  passwordValidation,
  postalValidation,
  streetValidation,
} from '../../utils/validator';
import Input from '../../components/input/Input';
import Select from '../../components/select/Select';
import styles from './Signup.module.scss';
import Button from '../../components/button/Button';
import InputPass from '../../components/inputPass/InputPass';
import { isAuth } from '../../utils/storage';

const Signup: FC = () => {
  const [email, setEmail] = useState<IFormField>({ data: '', error: '' });
  const [password, setPassword] = useState<IFormField>({ data: '', error: '' });
  const [firstName, setFirstName] = useState<IFormField>({ data: '', error: '' });
  const [lastName, setLastName] = useState<IFormField>({ data: '', error: '' });
  const [date, setDate] = useState<IFormField>({ data: '', error: '' });
  const [street, setStreet] = useState<IFormField>({ data: '', error: '' });
  const [city, setCity] = useState<IFormField>({ data: '', error: '' });
  const [postal, setPostal] = useState<IFormField>({ data: '', error: '' });
  const [country, setCountry] = useState<IFormField>({ data: '', error: '' });

  const [formValid, setFormValid] = useState<boolean>(false);
  const [countryData, setCountryData] = useState<ICountry>({});

  const navigate = useNavigate();

  useEffect(() => {
    const countries = iso3311a2.getData() as ICountry;
    setCountryData(countries);
  }, []);

  useEffect(() => {
    const fields = [email, password, firstName, lastName, date, street, city, postal, country];

    const hasError = fields.every((field) => !field.error);
    const hasData = fields.every((field) => field.data);

    setFormValid(hasError && hasData);
  }, [email, password, firstName, lastName, date, street, city, postal, country]);

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, type: Forms) {
    const { value } = event.target;
    if (Forms.email === type) setEmail({ error: '', data: value });
    if (Forms.password === type) setPassword({ error: '', data: value });
    if (Forms.firstName === type) setFirstName({ error: '', data: value });
    if (Forms.lastName === type) setLastName({ error: '', data: value });
    if (Forms.date === type) setDate({ error: '', data: value });
    if (Forms.street === type) setStreet({ error: '', data: value });
    if (Forms.city === type) setCity({ error: '', data: value });
    if (Forms.postal === type) setPostal({ error: '', data: value });
    if (Forms.country === type) setCountry({ error: '', data: value });
  }

  function validateAndSetState(
    validationFunction: (data: string, otherData?: string) => string,
    value: string,
    setStateFunction: React.Dispatch<React.SetStateAction<IFormField>>,
    otherValue?: string
  ): boolean {
    const validationError = validationFunction(value, otherValue);
    if (validationError !== value) {
      setStateFunction({ error: validationError, data: value });
      return true;
    }
    return false;
  }

  function handleFormSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    let error = false;

    error = validateAndSetState(emailValidation, email.data, setEmail) || error;
    error = validateAndSetState(passwordValidation, password.data, setPassword) || error;
    error = validateAndSetState(nameValidation, firstName.data, setFirstName) || error;
    error = validateAndSetState(nameValidation, lastName.data, setLastName) || error;
    error = validateAndSetState(dateValidation, date.data, setDate) || error;
    error = validateAndSetState(streetValidation, street.data, setStreet) || error;
    error = validateAndSetState(cityValidation, city.data, setCity) || error;
    error = validateAndSetState(() => postalValidation(postal.data, country.data), postal.data, setPostal) || error;
    error = validateAndSetState(countryValidation, country.data, setCountry) || error;

    if (!error) {
      getToken().then((token: string) =>
        signup(token, {
          email: email.data,
          password: password.data,
          firstName: firstName.data,
          lastName: lastName.data,
        }).then(() => {
          login(email.data, password.data).then(() => {
            if (isAuth()) {
              navigate('/main');
            } else {
              console.log('Incorrect username or password😬 Please try again');
            }
          });
        })
      );
    }
  }

  return (
    <div className={styles.signupPage}>
      <div className={styles.form}>
        <h2 className={styles.headline}>Registration page</h2>
        <form>
          <div className={styles.container}>
            <Input
              value={email.data}
              helper={email.error}
              onChange={(e) => handleFormChange(e, Forms.email)}
              props={{ placeholder: 'EMail', name: 'email' }}
            />
            <InputPass
              value={password.data}
              helper={password.error}
              onChange={(e) => handleFormChange(e, Forms.password)}
            />
          </div>

          <div className={styles.container}>
            <Input
              value={firstName.data}
              helper={firstName.error}
              onChange={(e) => handleFormChange(e, Forms.firstName)}
              props={{ placeholder: 'First Name', name: 'firstname' }}
            />
            <Input
              value={lastName.data}
              helper={lastName.error}
              onChange={(e) => handleFormChange(e, Forms.lastName)}
              props={{ placeholder: 'Last Name', name: 'lastname' }}
            />
            <Input
              value={date.data}
              helper={date.error}
              onChange={(e) => handleFormChange(e, Forms.date)}
              props={{ type: 'date', name: 'date', max: '2009-01-01', min: '1900-01-01' }}
            />
          </div>

          <div className={styles.container}>
            <Input
              value={street.data}
              helper={street.error}
              onChange={(e) => handleFormChange(e, Forms.street)}
              props={{ type: 'text', placeholder: 'Street', name: 'street' }}
            />
            <Input
              value={postal.data}
              helper={postal.error}
              onChange={(e) => handleFormChange(e, Forms.postal)}
              props={{ type: 'text', placeholder: 'Postal code', name: 'postal' }}
            />
            <Input
              value={city.data}
              helper={city.error}
              onChange={(e) => handleFormChange(e, Forms.city)}
              props={{ type: 'text', placeholder: 'City', name: 'city' }}
            />
          </div>

          <Select onChange={(e) => handleFormChange(e, Forms.country)} helper={country.error}>
            <option disabled selected>
              Choose a country
            </option>
            {Object.keys(countryData).map((code) => (
              <option key={code} value={code}>
                {countryData[code]}
              </option>
            ))}
          </Select>

          <Button disabled={!formValid} onClick={(e) => handleFormSubmit(e)}>
            Registration
          </Button>
          <p className={styles.formMessage}>
            Already registrationed? <Link to="/login">Login page</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
