import {CREATE_RULE_CHAIN, LOAD_RULE_CHAINS} from "../actions/types";

const initialState = {
    ruleChains: [],
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case LOAD_RULE_CHAINS:
            return {
                ...state,
                ruleChains: payload,
            };
        case CREATE_RULE_CHAIN:
            return {
                ...state,
                ruleChains: [...state.ruleChains, payload],
            };
        default:
            return state;
    }
}
