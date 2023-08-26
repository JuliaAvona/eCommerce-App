/* eslint-disable no-console */
import axios from 'axios';
import { ISignUp } from '../types/interfaces';
import { saveData, saveAnonimData } from '../utils/storage';

export const getToken = async () => {
  const authUrl = 'https://auth.us-central1.gcp.commercetools.com';
  const clientId = 'G6YqJ3Gkjvz8JhsqV9ijepkh';
  const clientSecret = 'EYMqnqO8H554djVE0ji0fEJhn7rxAI7E';
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

export const signup = async (accessToken: string, data: ISignUp) => {
  const projectKey = 'ecommerce-rsschool';
  const url = `https://api.us-central1.gcp.commercetools.com/${projectKey}/customers`;

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
  const projectKey = 'ecommerce-rsschool';
  const clientId = 'G6YqJ3Gkjvz8JhsqV9ijepkh';
  const clientSecret = 'EYMqnqO8H554djVE0ji0fEJhn7rxAI7E';
  const scope =
    'manage_my_shopping_lists:ecommerce-rsschool manage_my_business_units:ecommerce-rsschool manage_my_profile:ecommerce-rsschool view_categories:ecommerce-rsschool create_anonymous_token:ecommerce-rsschool manage_my_quote_requests:ecommerce-rsschool manage_my_quotes:ecommerce-rsschool manage_customers:ecommerce-rsschool manage_my_payments:ecommerce-rsschool manage_my_orders:ecommerce-rsschool view_published_products:ecommerce-rsschool';
  const url = `https://auth.us-central1.gcp.commercetools.com/oauth/${projectKey}/customers/token`;

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

export const getAnonymToken = async () => {
  const authUrl = 'https://auth.us-central1.gcp.commercetools.com';
  const projectKey = 'ecommerce-rsschool';
  const clientId = 'G6YqJ3Gkjvz8JhsqV9ijepkh';
  const clientSecret = 'EYMqnqO8H554djVE0ji0fEJhn7rxAI7E';
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

export const getProductsForAnonym = async () => {
  try {
    const accessToken = await getAnonymToken(); // Получаем анонимный токен
    const apiUrl = 'https://api.us-central1.gcp.commercetools.com';
    const projectKey = 'ecommerce-rsschool';

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
