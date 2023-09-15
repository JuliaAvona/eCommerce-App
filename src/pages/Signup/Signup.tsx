import React, { FC, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IBaseAddress, IFormData } from '../../types/interfaces';
import { getToken, login, signup } from '../../api';
import { dateValidation, emailValidation, nameValidation, passwordValidation } from '../../utils/validator';
import Input from '../../components/input/Input';
import styles from './Signup.module.scss';
import Button from '../../components/button/Button';
import InputPass from '../../components/inputPass/InputPass';
import Address from '../../components/address/Address';
import { Pages } from '../../types/enums';

const Signup: FC = () => {
  const [email, setEmail] = useState<IFormData>({ data: '', error: '' });
  const [password, setPassword] = useState<IFormData>({ data: '', error: '' });
  const [firstName, setFirstName] = useState<IFormData>({ data: '', error: '' });
  const [lastName, setLastName] = useState<IFormData>({ data: '', error: '' });
  const [date, setDate] = useState<IFormData>({ data: '', error: '' });

  const [addresses, setAddresses] = useState<{ address: IBaseAddress; error: boolean }[]>([]);

  const [addressComponents, setAddressComponents] = useState<{ address: IBaseAddress; error: boolean }[]>([]);
  const [forShipping, setForShipping] = useState<string | null>(null);
  const [forBilling, setForBilling] = useState<string | null>(null);
  const [forShippingAndBilling, setForShippingAndBilling] = useState<string | null>(null);

  const [valid, setValid] = useState<boolean>(false);
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const [responseError, setResponseError] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const fields = [email, password, firstName, lastName, date];
    const checkAddressesData = () => {
      for (let i = 0; i < addresses.length; i += 1) {
        const { address } = addresses[i];
        if (address.id === null || !address.country || !address.streetName || !address.postalCode || !address.city)
          return false;
      }
      return true;
    };
    const checkAddressesErrors = () => {
      for (let i = 0; i < addresses.length; i += 1) if (addresses[i].error !== false) return true;
      return false;
    };
    const hasError = fields.every((field) => !field.error) && checkAddressesErrors();
    const hasData = fields.every((field) => field.data) && checkAddressesData();
    setValid(!hasError && hasData && addresses.length > 0);
  }, [email, password, firstName, lastName, date, addresses]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail({ data: e.target.value, error: emailValidation(e.target.value) });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword({ data: e.target.value, error: passwordValidation(e.target.value) });
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFirstName({ data: e.target.value, error: nameValidation(e.target.value) });
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLastName({ data: e.target.value, error: nameValidation(e.target.value) });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDate({ data: e.target.value, error: dateValidation(e.target.value) });
  };

  const handleAddressChange = (address: IBaseAddress, error: boolean) => {
    setAddresses((prevData) => {
      const newData = [...prevData];
      const existingIndex = newData.findIndex((item) => item.address.id === address.id);

      if (existingIndex !== -1) newData[existingIndex] = { address, error };
      else newData.push({ address, error });

      return newData;
    });
  };

  const createNewAddress = () => {
    const address = {
      id: Date.now().toString(),
      country: '',
      streetName: '',
      postalCode: '',
      city: '',
    } as IBaseAddress;
    const error = true;
    setAddressComponents((current) => [...current, { address, error }]);
  };

  const deleteAddress = (key: string) => {
    const newAddressComponents = addressComponents.filter((item) => item.address.id !== key);
    setAddressComponents(newAddressComponents);
    if (key === forShipping) setForBilling(null);
    if (key === forBilling) setForBilling(null);
    if (key === forShipping && key === forBilling) setForShippingAndBilling(null);
    const newAddresses = addresses.filter((item) => item.address.id !== key);
    setAddresses(newAddresses);
  };

  const getAddress = (key: string | null): number | null => {
    if (key === null) return null;
    for (let i = 0; i < addresses.length; i += 1) {
      if (addresses[i].address.id === key) {
        return i;
      }
    }
    return null;
  };

  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();

    setOnLoad(true);
    setResponseError('');

    if (valid) {
      getToken().then((token: string) =>
        signup(token, {
          email: email.data,
          password: password.data,
          firstName: firstName.data,
          lastName: lastName.data,
          dateOfBirth: date.data,
          addresses: addresses.map((item) => item.address),
          defaultShippingAddress: forShippingAndBilling ? getAddress(forShippingAndBilling) : getAddress(forShipping),
          defaultBillingAddress: forShippingAndBilling ? getAddress(forShippingAndBilling) : getAddress(forBilling),
        })
          .then(() => {
            login(email.data, password.data)
              .then(() => navigate(Pages.main))
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
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.signup}>
        <h2 className={styles.h1}>Registration page</h2>
        <form>
          <div className={styles.container}>
            <Input
              value={email.data}
              helper={email.error}
              onChange={(e) => handleEmailChange(e)}
              props={{ placeholder: 'EMail', name: 'email' }}
            />
            <InputPass value={password.data} helper={password.error} onChange={(e) => handlePasswordChange(e)} />
          </div>

          <div className={styles.container}>
            <Input
              value={firstName.data}
              helper={firstName.error}
              onChange={(e) => handleFirstNameChange(e)}
              props={{ placeholder: 'First Name', name: 'firstname' }}
            />
            <Input
              value={lastName.data}
              helper={lastName.error}
              onChange={(e) => handleLastNameChange(e)}
              props={{ placeholder: 'Last Name', name: 'lastname' }}
            />
            <Input
              value={date.data}
              helper={date.error}
              onChange={(e) => handleDateChange(e)}
              props={{ type: 'date', name: 'date', max: '2009-01-01', min: '1900-01-01' }}
            />
          </div>

          <Button onClick={createNewAddress}>Add address</Button>
          {addressComponents.map((component) => {
            return (
              <Address
                key={component.address.id}
                index={component.address.id}
                forShipping={forShipping}
                forBilling={forBilling}
                forShippingAndBilling={forShippingAndBilling}
                setForShipping={(index, curr) => {
                  setForShipping(index === curr ? null : index);
                  setForShippingAndBilling(null);
                }}
                setForBilling={(index, curr) => {
                  setForBilling(index === curr ? null : index);
                  setForShippingAndBilling(null);
                }}
                setForShippingAndBilling={(index, curr) => {
                  setForShipping(null);
                  setForBilling(null);
                  setForShippingAndBilling(index === curr ? null : index);
                }}
                handleAddressChange={(address: IBaseAddress, error: boolean) => handleAddressChange(address, error)}
                deleteAddress={() => deleteAddress(component.address.id)}
              />
            );
          })}

          <h3 className={styles.error}>{responseError}</h3>
          <Button disabled={!valid || onLoad} onClick={(e) => handleFormSubmit(e)}>
            Registration
          </Button>

          <p className={styles.p}>
            Already registrationed? <Link to="/login">Login page</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
