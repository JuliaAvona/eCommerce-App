export interface ICustomerReq {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Array<IBaseAddress>;
  defaultShippingAddress: number | null;
  defaultBillingAddress: number | null;
}

export interface ICustomerRes {
  id: string;
  version: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Array<IBaseAddress>;
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
}

export interface IProfile {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: IBaseAddress[];
}

export interface IProfileUpdate {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  defaultShippingAddress: string | null;
  defaultBillingAddress: string | null;
  address: { action: string; addressId?: string | undefined; address?: IBaseAddress | undefined }[];
}

export interface IBaseAddress {
  id: string;
  key?: string;
  country: string;
  streetName: string;
  postalCode: string;
  city: string;
}

export interface ISignUpError {
  type: string;
  message: string;
}
export interface ICountry {
  [country: string]: string;
}

export interface IForm {
  email: IFormData;
  password: IFormData;
  firstName: IFormData;
  lastName: IFormData;
  date: IFormData;
  street: IFormData;
  postal: IFormData;
  city: IFormData;
  streetForBilling: IFormData;
  postalForBilling: IFormData;
  cityForBilling: IFormData;
  country: IFormData;
}

export interface IFormData {
  data: string;
  error: string;
}

export interface IResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface IProduct {
  id: string;
  name: { [key: string]: string };
  description: { [key: string]: string };
  metaDescription: { [key: string]: string };
  metaTitle: { [key: string]: string };
  masterVariant: {
    prices: Array<{
      value: {
        centAmount: number;
        currencyCode: string;
      };
      discounted: {
        value: {
          centAmount: number;
          currencyCode: string;
        };
      };
    }>;
    images: Array<{
      url: string;
      dimensions: {
        w: number;
        h: number;
      };
    }>;
  };
  variants: Array<Variant>;
}

export interface Variant {
  prices: Array<{
    value: {
      centAmount: number;
      currencyCode: string;
    };
    discounted: {
      value: {
        centAmount: number;
        currencyCode: string;
      };
    };
  }>;
  images: Array<{
    url: string;
    dimensions: {
      w: number;
      h: number;
    };
  }>;
}

export interface OneCardProps {
  name: string;
  img: string;
  id: string;
  price: string;
  discount?: string;
}

export interface IFilters {
  view: string;
  sortProducts: string;
  sortPrice: string;
  sortProductType: string;
  sortMaterials: string;
  searchQuery: string;
}

export interface IError {
  message: string[];
  statusCode: number;
}
