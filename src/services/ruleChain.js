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
    const data = RuleChainApi.createRuleChain(values)
    return data.ruleChain || null
}

const createRuleNodes = async (values) => {
    return await RuleChainApi.createRuleNodes(values)
}

export default {
    getAll,
    createRuleChain,
    getRuleNodes,
    createRuleNodes
};
