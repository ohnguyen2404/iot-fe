import axios from "axios";
import queryString from "query-string";
import {NODE_API_URL} from "../config/setting";

const AxiosEntityApi = axios.create({
    baseURL: NODE_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

AxiosEntityApi.interceptors.response.use(response => {
    if (response && response.data) {
        return response.data;
    }
}, async error => {

    throw error;
});

AxiosEntityApi.interceptors.request.use(config =>{
  const jwt = localStorage.getItem("accessToken");
  config.headers = {
      Authorization: `Bearer ${jwt}`,
      Accept: 'application/json'
  }
  return config;
})


export default AxiosEntityApi;