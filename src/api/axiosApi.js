import axios from "axios";
import queryString from "query-string";
import {API_URL} from "../config/setting";

const AxiosApi = axios.create({
  baseURL: API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

AxiosApi.interceptors.response.use(response => {
  if (response && response.data) {
    return response.data;
  }
}, async error => {

  throw error;
});

export default AxiosApi;