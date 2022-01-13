import AxiosRuleEngineApi from "./axios/axiosRuleEngineApi";
import {API_RULE_CHAIN, API_RULE_CHAINS, API_RULE_NODE} from "../config/setting";

export const RuleChainApi = {
    getRuleChains: () => {
        return AxiosRuleEngineApi.get(`${API_RULE_CHAINS}`)
    },

    getRuleChain: (ruleChainId) => {
        return AxiosRuleEngineApi.get(`${API_RULE_CHAIN}/${ruleChainId}` )
    },

    createRuleChain: (data) => {
        return AxiosRuleEngineApi.post(`${API_RULE_CHAIN}`, data)
    },

    createRuleNodes: (data) => {
        return AxiosRuleEngineApi.post(`${API_RULE_CHAIN}/${API_RULE_NODE}`, data)
    }
};
