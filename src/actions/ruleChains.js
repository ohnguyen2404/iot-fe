import {RuleChainService} from "../services";
import {CREATE_RULE_CHAIN, LOAD_RULE_CHAINS, OPEN_RULE_NODES} from "./types";

export const loadRuleChains = () => async (dispatch) => {
    const data = await RuleChainService.getAll();
    if (data) {
        dispatch({
            type: LOAD_RULE_CHAINS,
            payload: data,
        });
    }
    return data;
};

export const createRuleChain = (ruleChain) => async (dispatch) => {
    const data = await RuleChainService.createRuleChain(ruleChain)
    if (data) {
        dispatch({
            type: CREATE_RULE_CHAIN,
            payload: data,
        });
    }
    return data;
}

export const openRuleNodes = ({isOpen, ruleChain}) => async (dispatch) => {
    dispatch({
        type: OPEN_RULE_NODES,
        payload: {
            isOpen,
            ruleChain
        },
    });
}