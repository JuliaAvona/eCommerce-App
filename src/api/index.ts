/* eslint-disable no-console */
import axios, { AxiosError } from 'axios';
import { IError, IProfile, ICustomerReq, ICustomerRes } from '../types/interfaces';
import { saveData, saveAnonimData, isAuth } from '../utils/storage';

const projectKey = 'ecommerce-rsschool';
const clientId = 'G6YqJ3Gkjvz8JhsqV9ijepkh';
const clientSecret = 'EYMqnqO8H554djVE0ji0fEJhn7rxAI7E';
const apiUrl = 'https://api.us-central1.gcp.commercetools.com';
const authUrl = 'https://auth.us-central1.gcp.commercetools.com';

export const getToken = async () => {
  const scope =
    'manage_my_shopping_lists:ecommerce-rsschool manage_my_business_units:ecommerce-rsschool manage_my_profile:ecommerce-rsschool view_categories:ecommerce-rsschool create_anonymous_token:ecommerce-rsschool manage_my_quote_requests:ecommerce-rsschool manage_my_quotes:ecommerce-rsschool manage_customers:ecommerce-rsschool manage_my_payments:ecommerce-rsschool manage_my_orders:ecommerce-rsschool view_published_products:ecommerce-rsschool';
  try {
    const response = await axios.post(
      `${authUrl}/oauth/token`,
      new URLSearchParams({
        grant_type: 'client_credentials',
        scope,
      }),
      {
        auth: {
          username: clientId,
          password: clientSecret,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const token = response.data.access_token;
    return token;
  } catch (error) {
    console.log('Error getting access token:', error);
    throw error;
  }
};

export const signup = async (accessToken: string, data: ICustomerReq) => {
  const url = `${apiUrl}/${projectKey}/customers`;

  await axios
    .post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
    .then((userResponse) => {
      console.log('User registered:', userResponse.data);
    })
    .catch((error) => {
      console.log('Error registering user:', error.response.data.message);
      throw error.response.data.message;
    });
};

export const login = async (email: string, password: string) => {
  const scope =
    'manage_my_shopping_lists:ecommerce-rsschool manage_my_business_units:ecommerce-rsschool manage_my_profile:ecommerce-rsschool view_categories:ecommerce-rsschool create_anonymous_token:ecommerce-rsschool manage_my_quote_requests:ecommerce-rsschool manage_my_quotes:ecommerce-rsschool manage_customers:ecommerce-rsschool manage_my_payments:ecommerce-rsschool manage_my_orders:ecommerce-rsschool view_published_products:ecommerce-rsschool';
  const url = `${authUrl}/oauth/${projectKey}/customers/token`;

  await axios
    .post(
      url,
      new URLSearchParams({
        grant_type: 'password',
        username: email,
        password,
        scope,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: clientId,
          password: clientSecret,
        },
      }
    )
    .then((userResponse) => {
      console.log('User logged in:', userResponse.data);
      if (userResponse.data.access_token) {
        saveData(userResponse.data);
      }
      return userResponse.data.access_token;
    })
    .catch((error) => {
      console.log('Error logging in user:', error.response.data.message);
      throw error.response.data.message;
    });
};

export const getProfile = async (accessToken: string): Promise<ICustomerRes> => {
  const url = `${apiUrl}/${projectKey}/me`;

  try {
    const userResponse = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('User profile:', userResponse.data);
    return userResponse.data;
  } catch (e) {
    const error = e as AxiosError<IError>;
    console.log('Error getting profile:', error.response?.data.message);
    throw e;
  }
};

export const getAnonymToken = async () => {
  try {
    const response = await axios.post(
      `${authUrl}/oauth/${projectKey}/anonymous/token`,
      new URLSearchParams({
        grant_type: 'client_credentials',
      }),
      {
        auth: {
          username: clientId,
          password: clientSecret,
        },
      }
    );

    const token = response.data.access_token;
    saveAnonimData(response.data);
    return token;
  } catch (error) {
    console.log('Error getting access token:', error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    let accessToken;
    if (!isAuth()) {
      accessToken = await getAnonymToken();
    } else {
      accessToken = await getToken();
    }
    const response = await axios.get(`${apiUrl}/${projectKey}/product-projections`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const goods = response.data.results;
    console.log(goods);
    return goods;
  } catch (error) {
    console.log('Error getting product projections:', error);
    throw error;
  }
};

export const getProductForAnonym = async (key: string) => {
  try {
    const accessToken = localStorage.getItem('access_token_anonim');
    const response = await axios.get(`${apiUrl}/${projectKey}/product-projections/${key}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const product = response.data;
    console.log(product);
    return product;
  } catch (error) {
    console.log('Error getting product projections:', error);
    throw error;
  }
};
