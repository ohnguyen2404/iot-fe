export const IS_DEV = process.env.REACT_APP_NODE_ENV === "dev";

export const AUTH_API_URL = IS_DEV
  ? process.env.REACT_APP_DEV_AUTH_API_URL
  : process.env.REACT_APP_PROD_API_URL;

export const ENTITY_API_URL = IS_DEV
  ? process.env.REACT_APP_DEV_ENTITY_API_URL
  : process.env.REACT_APP_PROD_API_URL;

export const TRANSPORT_API_URL = IS_DEV
  ? process.env.REACT_APP_DEV_TRANSPORT_API_URL
  : process.env.REACT_APP_PROD_API_URL;

export const TELEMETRY_API_URL = IS_DEV
  ? process.env.REACT_APP_DEV_TELEMETRY_API_URL
  : process.env.REACT_APP_PROD_API_URL;

export const API_AUTH = `auth`;
export const API_TENANT = "tenant";
export const API_CUSTOMER = "customer";
export const API_DEVICE = "device";
export const API_TELEMETRY = "telemetry";
