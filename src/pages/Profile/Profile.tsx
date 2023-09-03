import React, { FC, useState, useEffect } from 'react';
import { getCountry } from 'iso-3166-1-alpha-2';
import { IBaseAddress, IProfile } from '../../types/interfaces';
import { getProfile } from '../../api';
import styles from './Profile.module.scss';
import { getAccessToken } from '../../utils/storage';
import Button from '../../components/button/Button';

const Profile: FC = () => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [onEdit, setOnEdit] = useState<boolean>(false);

  const findAddressById = (addresses: Array<IBaseAddress>, id: string): IBaseAddress => {
    return addresses.find((address) => address.id === id) || addresses[0];
  };

  useEffect(() => {
    const token = getAccessToken();
    if (token)
      getProfile(token)
        .then((data) => {
          setProfile({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: data.dateOfBirth,
            shippingAddress: findAddressById(data.addresses, data.defaultShippingAddressId),
            billingAddress: findAddressById(data.addresses, data.defaultBillingAddressId),
          });
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  return profile ? (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <h2 className={styles.headline}>Personal information</h2>
        <div className={styles.container}>
          <h3 className={styles.headline2}>First name:</h3>
          <div className={styles.text}>{profile.firstName}</div>
        </div>

        <div className={styles.container}>
          <h3 className={styles.headline2}>Last name:</h3>
          <div className={styles.text}>{profile.lastName}</div>
        </div>

        <div className={styles.container}>
          <h3 className={styles.headline2}>Date of birth:</h3>
          <div className={styles.text}>{profile.dateOfBirth}</div>
        </div>

        <div className={styles.container}>
          <h3 className={styles.headline2}>EMail:</h3>
          <div className={styles.text}>{profile.email}</div>
        </div>

        <h2 className={styles.headline}>Address</h2>
        <div className={styles.container}>
          <h3 className={styles.headline2}>Country:</h3>
          {getCountry(profile.shippingAddress.country)}
        </div>

        <div className={styles.container}>
          <h3 className={styles.headline2}>Shipping address:</h3>
          <div className={styles.text}>
            {profile.shippingAddress.city} {profile.shippingAddress.postalCode} {profile.shippingAddress.streetName}
          </div>
        </div>

        <div className={styles.container}>
          <h3 className={styles.headline2}>Billing address:</h3>
          <div className={styles.text}>
            {profile.billingAddress.city} {profile.billingAddress.postalCode} {profile.billingAddress.streetName}
          </div>
        </div>
        <Button onClick={() => setOnEdit(!onEdit)}>Edit</Button>
      </div>
    </div>
  ) : null;
};

export default Profile;
