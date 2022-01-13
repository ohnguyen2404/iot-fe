import {RuleChainApi} from "../api/ruleChain";

const getAll = async () => {
    return (await RuleChainApi.getRuleChains()) || [];
}

const createRuleChain = async (values) => {
    values.root = false;
    return RuleChainApi.createRuleChain(values)
}

export default {
    getAll,
    createRuleChain
};
