import React, { FC, useState, useEffect } from 'react';
import iso3311a2 from 'iso-3166-1-alpha-2';
import { Link, useNavigate } from 'react-router-dom';
import { ICountry, IForm, IFormData } from '../../types/interfaces';
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
import Checkbox from '../../components/checkbox/Checkbox';

const Signup: FC = () => {
  const [form, setForm] = useState<IForm>({
    email: { data: '', error: '' },
    password: { data: '', error: '' },
    firstName: { data: '', error: '' },
    lastName: { data: '', error: '' },
    date: { data: '', error: '' },
    street: { data: '', error: '' },
    postal: { data: '', error: '' },
    city: { data: '', error: '' },
    streetForBilling: { data: '', error: '' },
    postalForBilling: { data: '', error: '' },
    cityForBilling: { data: '', error: '' },
    country: { data: '', error: '' },
  });

  const [forBilling, setForBilling] = useState<boolean>(true);
  const [formValid, setFormValid] = useState<boolean>(false);
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const [countryData, setCountryData] = useState<ICountry>({});
  const [responseError, setResponseError] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const countries = iso3311a2.getData() as ICountry;
    setCountryData(countries);
  }, []);

  useEffect(() => {
    const fields = [
      form.email,
      form.password,
      form.firstName,
      form.lastName,
      form.date,
      form.street,
      form.city,
      form.postal,
      form.country,
    ];
    if (!forBilling) fields.push(form.streetForBilling, form.cityForBilling, form.postalForBilling);
    const hasError = fields.every((field) => !field.error);
    const hasData = fields.every((field) => field.data);
    setFormValid(hasError && hasData);
  }, [form, forBilling]);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, type: Forms) {
    const { value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [type]: { data: value, error: '' } as IFormData,
    }));
  }

  const validationFunctions: Record<Forms, (data: string, otherData?: string) => string> = {
    email: emailValidation,
    password: passwordValidation,
    firstName: nameValidation,
    lastName: nameValidation,
    date: dateValidation,
    street: streetValidation,
    postal: (data: string) => postalValidation(data, form.country.data),
    city: cityValidation,
    streetForBilling: streetValidation,
    postalForBilling: (data: string) => postalValidation(data, form.country.data),
    cityForBilling: cityValidation,
    country: countryValidation,
  };

  function validateAndSetState(fieldName: keyof IForm): boolean {
    const validationFunction = validationFunctions[fieldName];
    const value = form[fieldName].data;
    const validationError = validationFunction(value);

    if (validationError !== value) {
      setForm((prevForm) => ({
        ...prevForm,
        [fieldName]: { ...prevForm[fieldName], error: validationError },
      }));
      return true;
    }
    return false;
  }

  function handleFormSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    const fieldsToValidate: (keyof IForm)[] = [
      'email',
      'password',
      'firstName',
      'lastName',
      'date',
      'street',
      'postal',
      'city',
      'streetForBilling',
      'postalForBilling',
      'cityForBilling',
      'country',
    ];

    const hasError = fieldsToValidate.reduce((acc, fieldName) => {
      if (forBilling && ['streetForBilling', 'postalForBilling', 'cityForBilling'].includes(fieldName)) {
        return acc; // Пропустить эти поля, если forBilling === false
      }
      return validateAndSetState(fieldName) || acc;
    }, false);

    if (!hasError) {
      setOnLoad(true);
      setResponseError('');
      getToken().then((token: string) =>
        signup(token, {
          email: form.email.data,
          password: form.password.data,
          firstName: form.firstName.data,
          lastName: form.lastName.data,
        })
          .then(() => {
            login(form.email.data, form.password.data)
              .then(() => navigate('/main'))
              .catch((error) => {
                setResponseError(error);
                setOnLoad(false);
              });
          })
          .catch((error) => {
            setResponseError(error);
            setOnLoad(false);
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
              value={form.email.data}
              helper={form.email.error}
              onChange={(e) => handleFormChange(e, Forms.email)}
              props={{ placeholder: 'EMail', name: 'email' }}
            />
            <InputPass
              value={form.password.data}
              helper={form.password.error}
              onChange={(e) => handleFormChange(e, Forms.password)}
            />
          </div>

          <div className={styles.container}>
            <Input
              value={form.firstName.data}
              helper={form.firstName.error}
              onChange={(e) => handleFormChange(e, Forms.firstName)}
              props={{ placeholder: 'First Name', name: 'firstname' }}
            />
            <Input
              value={form.lastName.data}
              helper={form.lastName.error}
              onChange={(e) => handleFormChange(e, Forms.lastName)}
              props={{ placeholder: 'Last Name', name: 'lastname' }}
            />
            <Input
              value={form.date.data}
              helper={form.date.error}
              onChange={(e) => handleFormChange(e, Forms.date)}
              props={{ type: 'date', name: 'date', max: '2009-01-01', min: '1900-01-01' }}
            />
          </div>

          <h3 className={styles.headline2}>Shipping address</h3>
          <div className={styles.container}>
            <Input
              value={form.street.data}
              helper={form.street.error}
              onChange={(e) => handleFormChange(e, Forms.street)}
              props={{ type: 'text', placeholder: 'Street', name: 'street' }}
            />
            <Input
              value={form.postal.data}
              helper={form.postal.error}
              onChange={(e) => handleFormChange(e, Forms.postal)}
              props={{ type: 'text', placeholder: 'Postal code', name: 'postal' }}
            />
            <Input
              value={form.city.data}
              helper={form.city.error}
              onChange={(e) => handleFormChange(e, Forms.city)}
              props={{ type: 'text', placeholder: 'City', name: 'city' }}
            />
          </div>

          <Checkbox
            checked={forBilling}
            label="Set as address for billing and shipping"
            name="forBilling"
            onChange={() => setForBilling(!forBilling)}
            props={{ type: 'checkbox' }}
          />

          {forBilling ? null : (
            <div>
              <h3 className={styles.headline2}>Billing address</h3>
              <div className={styles.container}>
                <Input
                  value={form.streetForBilling.data}
                  helper={form.streetForBilling.error}
                  onChange={(e) => handleFormChange(e, Forms.streetForBilling)}
                  props={{ type: 'text', placeholder: 'Street', name: 'streetForBilling' }}
                />
                <Input
                  value={form.postalForBilling.data}
                  helper={form.postalForBilling.error}
                  onChange={(e) => handleFormChange(e, Forms.postalForBilling)}
                  props={{ type: 'text', placeholder: 'Postal code', name: 'postalForBilling' }}
                />
                <Input
                  value={form.cityForBilling.data}
                  helper={form.cityForBilling.error}
                  onChange={(e) => handleFormChange(e, Forms.cityForBilling)}
                  props={{ type: 'text', placeholder: 'City', name: 'cityForBilling' }}
                />
              </div>
            </div>
          )}

          <Select
            onChange={(e) => handleFormChange(e, Forms.country)}
            helper={form.country.error}
            props={{ defaultValue: 'Choose a country' }}
          >
            <option disabled>Choose a country</option>
            {Object.keys(countryData).map((code) => (
              <option key={code} value={code}>
                {countryData[code]}
              </option>
            ))}
          </Select>

          <h3 className={styles.headline3}>{responseError}</h3>
          <Button disabled={!formValid || onLoad} onClick={(e) => handleFormSubmit(e)}>
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
