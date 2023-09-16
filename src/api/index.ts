/* eslint-disable no-console */
import axios, { AxiosError } from 'axios';
import { IError, ICustomerReq, ICustomerRes, IProfile, IProfileUpdate, ICart, IMyCartDraft } from '../types/interfaces';
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
    console.log('Error getToken:', error);
    throw error;
  }
};

export const signup = async (accessToken: string, data: ICustomerReq) => {
  const url = `${apiUrl}/${projectKey}/customers`;

  return axios
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
      console.log('Error signup:', error.response.data.message);
      throw error.response.data.message;
    });
};

export const login = async (email: string, password: string) => {
  const scope =
    'manage_my_shopping_lists:ecommerce-rsschool manage_my_business_units:ecommerce-rsschool manage_my_profile:ecommerce-rsschool view_categories:ecommerce-rsschool create_anonymous_token:ecommerce-rsschool manage_my_quote_requests:ecommerce-rsschool manage_my_quotes:ecommerce-rsschool manage_customers:ecommerce-rsschool manage_my_payments:ecommerce-rsschool manage_my_orders:ecommerce-rsschool view_published_products:ecommerce-rsschool';
  const url = `${authUrl}/oauth/${projectKey}/customers/token`;

  return axios
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
      console.log('Error login:', error.response.data.message);
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

    return userResponse.data;
  } catch (e) {
    const error = e as AxiosError<IError>;
    console.log('Error getProfile:', error.response?.data.message);
    throw e;
  }
};

export const updateProfile = async (
  accessToken: string,
  id: string,
  version: number,
  data: IProfileUpdate
): Promise<IProfile> => {
  const url = `${apiUrl}/${projectKey}/customers/${id}`;
  try {
    const userResponse = await axios.post(
      url,
      {
        version,
        actions: [
          {
            action: 'changeEmail',
            email: data.email,
          },
          {
            action: 'setFirstName',
            firstName: data.firstName,
          },
          {
            action: 'setLastName',
            lastName: data.lastName,
          },
          {
            action: 'setDateOfBirth',
            dateOfBirth: data.dateOfBirth,
          },
          {
            action: 'setDefaultShippingAddress',
            addressId: data.defaultShippingAddress,
          },
          {
            action: 'setDefaultBillingAddress',
            addressId: data.defaultBillingAddress,
          },
          ...data.address,
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return userResponse.data;
  } catch (e) {
    const error = e as AxiosError<IError>;
    console.log('Error updateProfile:', error);
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
    console.log('Error getAnonymToken:', error);
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
    const response = await axios.get(`${apiUrl}/${projectKey}/product-projections?limit=30`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const goods = response.data.results;
    return goods;
  } catch (error) {
    console.log('Error getProducts:', error);
    throw error;
  }
};

export const getProductById = async (accessToken: string, id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/${projectKey}/product-projections/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const goods = response.data.results;
    return goods;
  } catch (error) {
    console.log('Error getProductById:', error.response.data.message);
    throw error;
  }
};

export const getProduct = async (key: string) => {
  try {
    let accessToken;
    if (!isAuth()) {
      accessToken = await getAnonymToken();
    } else {
      accessToken = await getToken();
    }
    const response = await axios.get(`${apiUrl}/${projectKey}/product-projections/${key}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const goods = response.data;
    return goods;
  } catch (error) {
    console.log('Error getProduct:', error);
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
    return product;
  } catch (error) {
    console.log('Error getProductForAnonym:', error);
    throw error;
  }
};

export const createCart = async (accessToken: string, myCartDraft: IMyCartDraft): Promise<ICart> => {
  const url = `${apiUrl}/${projectKey}/me/carts`;

  return axios
    .post(url, myCartDraft, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
    .then((cartResponse) => {
      console.log('Cart created:', cartResponse.data);
      return cartResponse.data;
    })
    .catch((error) => {
      console.log('Error createCart:', error.response.data.message);
      throw error.response.data.message;
    });
};

export const getCart = async (accessToken: string): Promise<ICart> => {
  const url = `${apiUrl}/${projectKey}/me/active-cart`;

  try {
    const userResponse = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return userResponse.data;
  } catch (e) {
    const error = e as AxiosError<IError>;
    console.log('Error getCart:', error.response?.data.message);
    throw e;
  }
};

export const addLineItem = async (
  accessToken: string,
  version: number,
  cartId: string,
  productId: string,
  quantity: number
): Promise<ICart> => {
  const url = `${apiUrl}/${projectKey}/me/carts/${cartId}`;

  return axios
    .post(
      url,
      {
        version,
        actions: [
          {
            action: 'addLineItem',
            productId,
            quantity,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((lineItemResponse) => {
      console.log('Line Item added:', lineItemResponse.data);
      return lineItemResponse.data;
    })
    .catch((error) => {
      console.log('Error addLineItem:', error.response.data.message);
      throw error.response.data.message;
    });
};

export const removeLineItem = async (
  accessToken: string,
  version: number,
  cartId: string,
  lineItemId: string,
  quantity?: number
): Promise<ICart> => {
  const url = `${apiUrl}/${projectKey}/me/carts/${cartId}`;

  return axios
    .post(
      url,
      {
        version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
            quantity,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((lineItemResponse) => {
      console.log('Line Item removed:', lineItemResponse.data);
      return lineItemResponse.data;
    })
    .catch((error) => {
      console.log('Error removeLineItem:', error.response.data.message);
      throw error.response.data.message;
    });
};

export const deleteCart = async (accessToken: string, id: string, version: number): Promise<ICart> => {
  const url = `${apiUrl}/${projectKey}/me/carts/${id}?version=${version}`;

  return axios
    .delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
    .then((cartResponse) => {
      console.log('Cart created:', cartResponse.data);
      return cartResponse.data;
    })
    .catch((error) => {
      console.log('Error createCart:', error.response.data.message);
      throw error.response.data.message;
    });
};
