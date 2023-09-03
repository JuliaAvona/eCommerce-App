/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import iso3311a2 from 'iso-3166-1-alpha-2';
import { IBaseAddress, ICountry, IFormData } from '../../types/interfaces';
import { streetValidation, postalValidation, cityValidation, countryValidation } from '../../utils/validator';
import Checkbox from '../Checkbox/Checkbox';
import Input from '../Input/Input';
import Select from '../Select/Select';
import styles from './Address.module.css';
import Button from '../Button/Button';

interface AddressProps {
  index: number;
  forShipping: number | null;
  forBilling: number | null;
  forShippingAndBilling: number | null;
  setForShipping: (index: number, curr: number | null) => void;
  setForBilling: (index: number, curr: number | null) => void;
  setForShippingAndBilling: (index: number, curr: number | null) => void;
  handleAddressChange: (address: IBaseAddress, error: boolean) => void;
  deleteAddress: (key: number) => void;
}

const Address: FC<AddressProps> = ({
  index,
  forShipping = null,
  forBilling = null,
  forShippingAndBilling = null,
  setForShipping,
  setForBilling,
  setForShippingAndBilling,
  handleAddressChange,
  deleteAddress,
}) => {
  const [country, setСountry] = useState<IFormData>({ data: '', error: '' });
  const [countryData, setCountryData] = useState<ICountry>({});
  const [street, setStreet] = useState<IFormData>({ data: '', error: '' });
  const [postal, setPostal] = useState<IFormData>({ data: '', error: '' });
  const [city, setCity] = useState<IFormData>({ data: '', error: '' });
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
      <Button onClick={() => deleteAddress()}>Delete address</Button>

      <Checkbox
        checked={index === forShipping}
        label="Set as default shipping address"
        name={`forShipping${index.toString()}`}
        onChange={() => setForShipping(index, forShipping)}
        props={{ type: 'checkbox' }}
      />
      <Checkbox
        checked={index === forBilling}
        label="Set as default billing address"
        name={`forBilling${index.toString()}`}
        onChange={() => setForBilling(index, forBilling)}
        props={{ type: 'checkbox' }}
      />
      <Checkbox
        checked={index === forShippingAndBilling}
        label="Set as default shipping and billing address"
        name={`forShippingAndBilling${index.toString()}`}
        onChange={() => setForShippingAndBilling(index, forShippingAndBilling)}
        props={{ type: 'checkbox' }}
      />

      <Select
        onChange={(e) => handleCountryChange(e)}
        helper={country.error}
        props={{ defaultValue: 'Choose a country' }}
      >
        <option disabled>Choose a country</option>
        {Object.keys(countryData).map((code) => (
          <option key={code} value={code}>
            {countryData[code]}
          </option>
        ))}
      </Select>

      <Input
        value={street.data}
        helper={street.error}
        onChange={(e) => handleStreetChange(e)}
        props={{ type: 'text', placeholder: 'Street', name: 'street' }}
      />
      <Input
        value={postal.data}
        helper={postal.error}
        onChange={(e) => handlePostalChange(e)}
        props={{ type: 'text', placeholder: 'Postal code', name: 'postal' }}
      />
      <Input
        value={city.data}
        helper={city.error}
        onChange={(e) => handleCityChange(e)}
        props={{ type: 'text', placeholder: 'City', name: 'city' }}
      />
    </div>
  );
};

export default Address;
