import React, { FC, useState, useEffect } from 'react';
import iso3311a2 from 'iso-3166-1-alpha-2';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { ICountry, IFormField } from '../../types/interfaces';
import { getToken, signUp } from '../../api';
import { Forms, Pages, Variant } from '../../types/enums';
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
import Input from '../../components/input';
import Select from '../../components/select';
import Button from '../../components/button';
import Date from '../../components/date';

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

  const navigate = useNavigate();

  useEffect(() => {
    const countries = iso3311a2.getData() as ICountry;
    setCountryData(countries);
  }, []);

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, type: Form) {
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
    <>
      <h2>Registration page</h2>
      <Form>
        <Input
          label="EMail"
          value={email.data}
          helper={email.error}
          onChange={(e) => handleFormChange(e, Forms.email)}
          props={{ type: 'text' }}
        />
        <Input
          label="Password"
          value={password.data}
          helper={password.error}
          onChange={(e) => handleFormChange(e, Forms.password)}
          props={{ type: 'password' }}
        />
        <Input
          label="First Name"
          value={firstName.data}
          helper={firstName.error}
          onChange={(e) => handleFormChange(e, Forms.firstName)}
          props={{ type: 'text' }}
        />
        <Input
          label="Last Name"
          value={lastName.data}
          helper={lastName.error}
          onChange={(e) => handleFormChange(e, Forms.lastName)}
          props={{ type: 'text' }}
        />
        <Date
          label="Date of Birth"
          value={date.data}
          helper={date.error}
          onChange={(e) => handleFormChange(e, Forms.date)}
        />
        <Input
          label="Street"
          value={street.data}
          helper={street.error}
          onChange={(e) => handleFormChange(e, Forms.street)}
          props={{ type: 'text' }}
        />
        <Input
          label="City"
          value={city.data}
          helper={city.error}
          onChange={(e) => handleFormChange(e, Forms.city)}
          props={{ type: 'text' }}
        />
        <Input
          label="Postal code"
          value={postal.data}
          helper={postal.error}
          onChange={(e) => handleFormChange(e, Forms.postal)}
          props={{ type: 'text' }}
        />
        <Select label="country" onChange={(e) => handleFormChange(e, Forms.country)}>
          {Object.keys(countryData).map((code) => (
            <option key={code} value={code}>
              {countryData[code]}
            </option>
          ))}
        </Select>
        <Button variant={Variant.primary} onClick={(e) => handleFormSubmit(e)}>
          Registration
        </Button>
        Already registrationed?
        <Button variant={Variant.primary} onClick={() => navigate(`/${Pages.login}`)}>
          Login
        </Button>
      </Form>
    </>
  );
};

export default Signup;
