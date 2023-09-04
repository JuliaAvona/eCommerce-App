/* eslint-disable no-restricted-syntax */
import React, { FC, useState, useEffect } from 'react';
import _ from 'lodash';
import { IBaseAddress, ICustomerRes, IFormData, IProfileUpdate } from '../../types/interfaces';
import { getProfile, getToken, updateProfile } from '../../api';
import styles from './Profile.module.scss';
import { getAccessToken } from '../../utils/storage';
import Button from '../../components/Button/Button';
import { dateValidation, emailValidation, nameValidation } from '../../utils/validator';
import Input from '../../components/Input/Input';
import Address from '../../components/Address/Address';

const Profile: FC = () => {
  const [profile, setProfile] = useState<ICustomerRes | null>(null);
  const [email, setEmail] = useState<IFormData>({ data: '', error: '' });
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

  const [onEdit, setOnEdit] = useState<boolean>(false);

  useEffect(() => {
    const fields = [email, firstName, lastName, date];
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
  }, [email, firstName, lastName, date, addresses]);

  useEffect(() => {
    const token = getAccessToken();
    if (token)
      getProfile(token)
        .then((data) => {
          console.log(data);
          setProfile(data);
          setEmail({ data: data.email || '', error: '' });
          setFirstName({ data: data.firstName || '', error: '' });
          setLastName({ data: data.lastName || '', error: '' });
          setAddresses(
            data.addresses.map((address) => {
              return { address, error: false };
            })
          );
          setAddressComponents(
            data.addresses.map((address) => {
              return { address, error: false };
            })
          );

          setForShipping(data.defaultShippingAddressId);
          setForBilling(data.defaultBillingAddressId);
          setForShippingAndBilling(
            data.defaultShippingAddressId === data.defaultBillingAddressId ? data.defaultShippingAddressId : null
          );
          setDate({ data: data.dateOfBirth || '', error: '' });
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail({ data: e.target.value, error: emailValidation(e.target.value) });
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

  function compareArrays(originalArray: IBaseAddress[] | [], modifiedArray: IBaseAddress[] | []) {
    const resultArray = [];

    // Создаем карту для удобного поиска адресов по id
    const originalMap = new Map(originalArray.map((address) => [address.id, address]));

    for (const modifiedAddress of modifiedArray) {
      const originalAddress = originalMap.get(modifiedAddress.id);

      if (!originalAddress) {
        // Если адреса нет в оригинальном массиве, добавляем "addAddress"
        resultArray.push({
          action: 'addAddress',
          address: modifiedAddress,
        });
      } else if (!_.isEqual(originalAddress, modifiedAddress)) {
        // Если адрес был изменен, добавляем "changeAddress"
        resultArray.push({
          action: 'changeAddress',
          addressId: modifiedAddress.id,
          address: modifiedAddress,
        });
      }
    }

    for (const originalAddress of originalArray) {
      if (!modifiedArray.some((address) => address.id === originalAddress.id)) {
        // Если адреса нет в измененном массиве, добавляем "removeAddress"
        resultArray.push({
          action: 'removeAddress',
          addressId: originalAddress.id,
        });
      }
    }
    return resultArray;
  }

  const handleFormSubmit = (): void => {
    setOnLoad(true);
    setResponseError('');

    const data = {
      email: email.data,
      firstName: firstName.data,
      lastName: lastName.data,
      dateOfBirth: date.data,
      defaultShippingAddress: forShippingAndBilling || forShipping,
      defaultBillingAddress: forShippingAndBilling || forBilling,
      address: compareArrays(
        profile?.addresses || [],
        addresses.map((address) => address.address)
      ),
    } as IProfileUpdate;

    if (valid && profile) {
      getToken().then((token: string) =>
        updateProfile(token, profile.id, profile.version, data)
          .then(() => {
            setOnEdit(false);
            setOnLoad(false);
          })
          .catch((error) => {
            setResponseError(error.message);
            setOnLoad(false);
          })
      );
    }
  };

  return profile ? (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <h2 className={styles.h1}>Profile page</h2>
        <form>
          <div className={styles.container}>
            <div className={styles.text}>EMail: </div>
            <Input
              value={email.data}
              helper={email.error}
              onChange={(e) => handleEmailChange(e)}
              disabled={!onEdit}
              props={{ placeholder: 'EMail', name: 'email' }}
            />
          </div>

          <div className={styles.container}>
            <div className={styles.text}>First Name: </div>
            <Input
              value={firstName.data}
              helper={firstName.error}
              onChange={(e) => handleFirstNameChange(e)}
              disabled={!onEdit}
              props={{ placeholder: 'First Name', name: 'firstname' }}
            />
          </div>

          <div className={styles.container}>
            <div className={styles.text}>Last Name: </div>
            <Input
              value={lastName.data}
              helper={lastName.error}
              onChange={(e) => handleLastNameChange(e)}
              disabled={!onEdit}
              props={{ placeholder: 'Last Name', name: 'lastname' }}
            />
          </div>

          <div className={styles.container}>
            <div className={styles.text}>Date of birth: </div>
            <Input
              value={date.data}
              helper={date.error}
              onChange={(e) => handleDateChange(e)}
              disabled={!onEdit}
              props={{ type: 'date', name: 'date', max: '2009-01-01', min: '1900-01-01' }}
            />
          </div>

          <h3 className={styles.error}>{responseError}</h3>
          {onEdit ? (
            <Button disabled={!valid || onLoad} onClick={() => handleFormSubmit()}>
              Save
            </Button>
          ) : (
            <Button onClick={() => setOnEdit(!onEdit)}>Edit</Button>
          )}
          {onEdit ? <Button onClick={createNewAddress}>Add address</Button> : null}

          {addressComponents.map((component) => {
            return (
              <Address
                key={component.address.id}
                index={component.address.id}
                addresses={component.address}
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
                disabled={!onEdit}
              />
            );
          })}
        </form>
      </div>
    </div>
  ) : null;
};

export default Profile;
