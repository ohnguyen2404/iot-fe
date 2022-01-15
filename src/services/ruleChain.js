import {RuleChainApi} from "../api/ruleChain";

const getAll = async () => {
    const data = await RuleChainApi.getRuleChains();
    return data.ruleChains || [];
}

const getRuleNodes = async (ruleChainId) => {
    const {ruleNodes, relations} = await RuleChainApi.getRuleNodes(ruleChainId);
    return {ruleNodes, relations}
}

const createRuleChain = async (values) => {
    values.root = false;
    const data = await RuleChainApi.createRuleChain(values)
    return data.ruleChain || null
}

const createRuleNodes = (values) => {
    return RuleChainApi.createRuleNodes(values)
}

export default {
    getAll,
    createRuleChain,
    getRuleNodes,
    createRuleNodes
};
