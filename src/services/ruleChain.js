import {RuleChainApi} from "../api/ruleChain";

const getAll = async () => {
    return (await RuleChainApi.getRuleChains()) || [];
}

const getRuleNodes = async (ruleChainId) => {
    return (await RuleChainApi.getRuleNodes(ruleChainId)) || [];
}

const createRuleChain = async (values) => {
    values.root = false;
    return RuleChainApi.createRuleChain(values)
}

export default {
    getAll,
    createRuleChain,
    getRuleNodes
};
