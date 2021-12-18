import axios from "axios";
import queryString from "query-string";
import {NODE_API_URL} from "../config/setting";

const AxiosNodeApi = axios.create({
    baseURL: NODE_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

AxiosNodeApi.interceptors.response.use(response => {
    if (response && response.data) {
        return response.data;
    }
}, async error => {

    throw error;
});

export default AxiosNodeApi;