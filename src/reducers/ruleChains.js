import {CREATE_RULE_CHAIN, LOAD_RULE_CHAINS, LOAD_RULE_NODE_DESCRIPTORS, OPEN_RULE_NODES} from "../actions/types";

const initialState = {
    ruleChains: [],
    openRuleNodes: {
        isOpen: false,
        ruleChain: {}
    },
    ruleNodeDescriptors: []
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case LOAD_RULE_CHAINS:
            return {
                ...state,
                ruleChains: payload,
            };
        case LOAD_RULE_NODE_DESCRIPTORS:
            return {
                ...state,
                ruleNodeDescriptors: payload,
            };
        case CREATE_RULE_CHAIN:
            return {
                ...state,
                ruleChains: [...state.ruleChains, payload],
            };
        case OPEN_RULE_NODES:
            return {
                ...state,
                openRuleNodes: payload,
            };
        default:
            return state;
    }
}
