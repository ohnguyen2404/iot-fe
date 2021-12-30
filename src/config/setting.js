export const IS_DEV = process.env.REACT_APP_NODE_ENV === "dev";

export const API_URL = IS_DEV
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_PROD_API_URL;

export const NODE_API_URL = IS_DEV
    ? process.env.REACT_APP_DEV_NODE_API_URL
    : process.env.REACT_APP_PROD_API_URL;
    
export const API_AUTH = `auth`;
export const API_TENANT = 'tenant';
export const API_CUSTOMER = 'customer';
export const API_DEVICE = 'device'