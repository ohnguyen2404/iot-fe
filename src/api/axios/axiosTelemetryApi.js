import axios from "axios";
import queryString from "query-string";
import {TELEMETRY_API_URL} from "../../config/setting";
import {getItem} from "../../local-storage";

const AxiosTelemetryApi = axios.create({
    baseURL: TELEMETRY_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

AxiosTelemetryApi.interceptors.response.use(response => {
    if (response && response.data) {
        return response.data;
    }
}, async error => {

    throw error;
});

AxiosTelemetryApi.interceptors.request.use(config => {
    const jwt = getItem("accessToken");
    config.headers = {
        Authorization: `Bearer ${jwt}`,
        Accept: 'application/json'
    }
    return config;
})

export default AxiosTelemetryApi;