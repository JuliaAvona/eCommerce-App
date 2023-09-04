/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import iso3311a2 from 'iso-3166-1-alpha-2';
import { IBaseAddress, ICountry, IFormData } from '../../types/interfaces';
import { streetValidation, postalValidation, cityValidation, countryValidation } from '../../utils/validator';
import Checkbox from '../Checkbox/Checkbox';
import Input from '../Input/Input';
import Select from '../Select/Select';
import styles from './Address.module.scss';
import Button from '../Button/Button';

interface AddressProps {
  index: string;
  addresses?: IBaseAddress;
  forShipping: string | null;
  forBilling: string | null;
  forShippingAndBilling: string | null;
  setForShipping: (index: string, curr: string | null) => void;
  setForBilling: (index: string, curr: string | null) => void;
  setForShippingAndBilling: (index: string, curr: string | null) => void;
  handleAddressChange: (address: IBaseAddress, error: boolean) => void;
  deleteAddress: (key: number) => void;
  disabled?: boolean;
}

const Address: FC<AddressProps> = ({
  index,
  addresses,
  forShipping = null,
  forBilling = null,
  forShippingAndBilling = null,
  setForShipping,
  setForBilling,
  setForShippingAndBilling,
  handleAddressChange,
  deleteAddress,
  disabled,
}) => {
  const [country, setСountry] = useState<IFormData>({ data: addresses?.country || '', error: '' });
  const [countryData, setCountryData] = useState<ICountry>({});
  const [street, setStreet] = useState<IFormData>({ data: addresses?.streetName || '', error: '' });
  const [postal, setPostal] = useState<IFormData>({ data: addresses?.postalCode || '', error: '' });
  const [city, setCity] = useState<IFormData>({ data: addresses?.city || '', error: '' });

  useEffect(() => {
    const countries = iso3311a2.getData() as ICountry;
    setCountryData(countries);
  }, []);

  useEffect(() => {
    const address = {
      id: index.toString(),
      country: country.data,
      streetName: street.data,
      postalCode: postal.data,
      city: city.data,
    } as IBaseAddress;
    const error = !!street.error || !!postal.error || !!city.error;
    handleAddressChange(address, error);
  }, [street, postal, city]);

  useEffect(() => {
    setPostal({ data: postal.data, error: postalValidation(postal.data, country.data) });
  }, [country]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setСountry({ data: e.target.value, error: countryValidation(e.target.value) });
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setStreet({ data: e.target.value, error: streetValidation(e.target.value) });
  };

  const handlePostalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPostal({ data: e.target.value, error: postalValidation(e.target.value, country.data) });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCity({ data: e.target.value, error: cityValidation(e.target.value) });
  };

  return (
    <div className={styles.container}>
      {disabled ? null : <Button onClick={() => deleteAddress()}>Delete address</Button>}

      <Checkbox
        checked={index === forShippingAndBilling ? false : index === forShipping}
        label="Default shipping address"
        name={`forShipping${index.toString()}`}
        onChange={() => setForShipping(index, forShipping)}
        disabled={disabled}
        props={{ type: 'checkbox' }}
      />
      <Checkbox
        checked={index === forShippingAndBilling ? false : index === forBilling}
        label="Default billing address"
        name={`forBilling${index.toString()}`}
        onChange={() => setForBilling(index, forBilling)}
        disabled={disabled}
        props={{ type: 'checkbox' }}
      />
      <Checkbox
        checked={index === forShippingAndBilling}
        label="Default shipping and billing address"
        name={`forShippingAndBilling${index.toString()}`}
        onChange={() => setForShippingAndBilling(index, forShippingAndBilling)}
        disabled={disabled}
        props={{ type: 'checkbox' }}
      />

      {disabled ? (
        <div className={styles.text}>Country: {countryData[country.data]}</div>
      ) : (
        <Select
          onChange={(e) => handleCountryChange(e)}
          disabled={disabled}
          helper={country.error}
          props={{ defaultValue: country.data ? country.data : 'Choose a country' }}
        >
          <option disabled>{countryData[country.data]}</option>
          {Object.keys(countryData).map((code) => (
            <option key={code} value={code}>
              {countryData[code]}
            </option>
          ))}
        </Select>
      )}

      {disabled ? <div className={styles.text}>Street: </div> : null}
      <Input
        value={street.data}
        helper={street.error}
        onChange={(e) => handleStreetChange(e)}
        disabled={disabled}
        props={{ type: 'text', placeholder: 'Street', name: 'street' }}
      />
      {disabled ? <div className={styles.text}>Postal: </div> : null}
      <Input
        value={postal.data}
        helper={postal.error}
        onChange={(e) => handlePostalChange(e)}
        disabled={disabled}
        props={{ type: 'text', placeholder: 'Postal code', name: 'postal' }}
      />
      {disabled ? <div className={styles.text}>City: </div> : null}
      <Input
        value={city.data}
        helper={city.error}
        onChange={(e) => handleCityChange(e)}
        disabled={disabled}
        props={{ type: 'text', placeholder: 'City', name: 'city' }}
      />
    </div>
  );
};

export default Address;
