import React, { FC, useState, useEffect } from 'react';
import iso3311a2 from 'iso-3166-1-alpha-2';
import styles from './Signup.module.css';
import { Form } from '../../types/enums';
import { ICountry, IFormField } from '../../types/interfaces';
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
import { getToken, signUp } from '../../api';

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

  const [countryData, setCountryData] = useState<ICountry>({});

  useEffect(() => {
    const countries = iso3311a2.getData() as ICountry;
    setCountryData(countries);
  }, []);

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, type: Form) {
    const { value } = event.target;
    if (Form.email === type) setEmail({ error: '', data: value });
    if (Form.password === type) setPassword({ error: '', data: value });
    if (Form.firstName === type) setFirstName({ error: '', data: value });
    if (Form.lastName === type) setLastName({ error: '', data: value });
    if (Form.date === type) setDate({ error: '', data: value });
    if (Form.street === type) setStreet({ error: '', data: value });
    if (Form.city === type) setCity({ error: '', data: value });
    if (Form.postal === type) setPostal({ error: '', data: value });
    if (Form.country === type) setCountry({ error: '', data: value });
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
        signUp(token, {
          email: email.data,
          password: password.data,
          firstName: firstName.data,
          lastName: lastName.data,
        })
      );
    }
  }

  return (
    <div className={styles.registrationPage}>
      <div className={styles.form}>
        <h2 className={styles.headline}>Registration page</h2>
        <form className={styles.registrationForm}>
          <div className={styles.registrationRowContainer}>
            <div className={styles.textarea}>
              <input
                type="text"
                placeholder="EMail"
                onChange={(e) => handleFormChange(e, Form.email)}
                value={email.data}
              />
              <div className={styles.placeholder}>{email.error}</div>
            </div>

            <div className={styles.textarea}>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => handleFormChange(e, Form.password)}
                value={password.data}
              />
              <div className={styles.placeholder}>{password.error}</div>
            </div>
          </div>

          <div className={styles.registrationRowContainer}>
            <div className={styles.textarea}>
              <input
                type="text"
                placeholder="First Name"
                onChange={(e) => handleFormChange(e, Form.firstName)}
                value={firstName.data}
              />
              <div className={styles.placeholder}>{firstName.error}</div>
            </div>
            <div className={styles.textarea}>
              <input
                type="text"
                placeholder="Last Name"
                onChange={(e) => handleFormChange(e, Form.lastName)}
                value={lastName.data}
              />
              <div className={styles.placeholder}>{lastName.error}</div>
            </div>
            <div className={styles.textarea}>
              <input
                type="date"
                onChange={(e) => handleFormChange(e, Form.date)}
                max="2009-01-01"
                min="1900-01-01"
                value={date.data}
              />
              <div className={styles.placeholder}>{date.error}</div>
            </div>
          </div>

          <div className={styles.registrationColContainer}>
            <div className={styles.registrationRowContainer}>
              <div className={styles.textarea}>
                <input
                  type="text"
                  placeholder="Street"
                  onChange={(e) => handleFormChange(e, Form.street)}
                  value={street.data}
                />
                <div className={styles.placeholder}>{street.error}</div>
              </div>
              <div className={styles.textarea}>
                <input
                  type="text"
                  placeholder="City"
                  onChange={(e) => handleFormChange(e, Form.city)}
                  value={city.data}
                />
                <div className={styles.placeholder}>{city.error}</div>
              </div>
            </div>
            <div className={styles.registrationRowContainer}>
              <div className={styles.textarea}>
                <input
                  type="text"
                  placeholder="Postal code"
                  onChange={(e) => handleFormChange(e, Form.postal)}
                  value={postal.data}
                />
                <div className={styles.placeholder}>{postal.error}</div>
              </div>
              <div className={styles.textarea}>
                <select onChange={(e) => handleFormChange(e, Form.country)} defaultValue="DEFAULT">
                  <option value="DEFAULT" disabled>
                    Choose the country
                  </option>
                  {Object.keys(countryData).map((code) => (
                    <option key={code} value={code}>
                      {countryData[code]}
                    </option>
                  ))}
                  <option value="AF">Afghanistan</option>
                </select>
                <div className={styles.placeholder} />
              </div>
            </div>
          </div>

          <button className={styles.button} type="button" onClick={handleFormSubmit}>
            registration
          </button>
          <p className={styles.message}>
            Already registrationed? <a href="/">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
