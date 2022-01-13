import axios from "axios";
import queryString from "query-string";
import {RULE_ENGINE_API_URL} from "../../config/setting";
import {getItem} from "../../local-storage";

const AxiosRuleEngineApi = axios.create({
    baseURL: RULE_ENGINE_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

AxiosRuleEngineApi.interceptors.response.use(response => {
    if (response && response.data) {
        return response.data;
    }
}, async error => {

    throw error;
});

AxiosRuleEngineApi.interceptors.request.use(config => {
    const jwt = getItem("accessToken");
    config.headers = {
        Authorization: `Bearer ${jwt}`,
        Accept: 'application/json'
    }
    return config;
})

export default AxiosRuleEngineApi;