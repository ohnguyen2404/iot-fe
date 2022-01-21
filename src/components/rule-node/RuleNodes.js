import React, {useEffect, useRef, useState} from 'react'
import ReactFlow, {addEdge, Background, ReactFlowProvider, removeElements} from "react-flow-renderer";
import '../react-flow/DragNDrop.css';
import SideBarReactFlow from "../react-flow/SideBarReactFlow";
import {RuleChainService} from "../../services";
import {useSelector} from "react-redux";
import CreateRuleNodeModal from "./CreateRuleNodeModal";
import _ from "lodash";
import {Fab} from "react-tiny-fab";
import {Icon} from "antd";
import {findIndex} from "lodash/array";

const edgeStyle = {
    className: 'normal-edge',
    arrowHeadType: 'arrow',

    labelStyle: {fill: '#0D257F', fontWeight: 700},
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 6,
    labelBgStyle: {fill: 'white', border: '2px solid #0D257F'},

    style: {
        strokeWidth: '3.5'
    }
}

const convertToReactFlow = (ruleNode, index) => {
    return {
        id: index.toString(),
        data: {
            id: ruleNode.id,
            label: ruleNode.name,
            config: ruleNode.config,
            clazz: ruleNode.clazz,
        },
        type: 'default',
        position: JSON.parse(ruleNode.additionalInfo),
        targetPosition: "left",
        sourcePosition: 'right',
    }
}

const convertToRuleNode = (reactFlowNode) => {
    const ruleNode = {
        name: reactFlowNode.data.label,
        additionalInfo: JSON.stringify(reactFlowNode.position),
        config: reactFlowNode.data.config,
        clazz: reactFlowNode.data.clazz
    }
    if (reactFlowNode.data.id) {
        ruleNode.id = reactFlowNode.data.id;
    }

    return ruleNode;
}

const convertToRelation = (reactFlowConnection, reactFlowNodes) => {
    const sourceIndex = reactFlowNodes.map(reactFlowNode => reactFlowNode.id).indexOf(reactFlowConnection.source);
    const targetIndex = reactFlowNodes.map(reactFlowNode => reactFlowNode.id).indexOf(reactFlowConnection.target);

    return {
        fromIndex: parseInt(sourceIndex),
        toIndex: parseInt(targetIndex),
        name: reactFlowConnection.label
    }
}

const convertToReactFlowConnection = (relation) => {
    return {
        id: `${relation.fromIndex.toString()}-${relation.toIndex.toString()}`,
        source: relation.fromIndex.toString(),
        target: relation.toIndex.toString(),
        label: relation.name,
        ...edgeStyle
    }
}

const clearUndefinedArray = (arr) => arr.filter(e => e !== undefined)

const RuleNodes = () => {
    const {openRuleNodes} = useSelector((state) => state.ruleChains);
    const {ruleChain} = openRuleNodes;

    const reactFlowWrapper = useRef(null);

    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState([]);
    const [connections, setConnections] = useState([]);
    const [prevElements, setPrevElements] = useState([]);
    const [prevConnections, setPrevConnections] = useState([]);
    const [newNode, setNewNode] = useState({
        id: "",
        data: {
            label: "",
            config: "",
            clazz: ""
        },
        type: 'default',
        position: "",
        targetPosition: "left",
        sourcePosition: 'right',
    });
    const [ruleNodeDescriptor, setRuleNodeDescriptor] = useState(null);

    const [openCreateRuleNode, setOpenCreateRuleNode] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [backgroundColorButton, setBackgroundColorButton] = useState("#666");

    const getId = () => window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);

    useEffect(() => {
        const loadRuleNodes = async () => {
            const {ruleNodes, relations} = await RuleChainService.getRuleNodes(ruleChain.id)

            if (ruleNodes !== null) {
                let newElements = ruleNodes.map((ruleNode, index) => {
                    return convertToReactFlow(ruleNode, index)
                })

                setElements(newElements);
                setPrevElements(_.cloneDeep(newElements));
            }

            if (relations !== null) {
                let newConnections = relations.map(relation => {
                    return convertToReactFlowConnection(relation)
                });

                setConnections(newConnections);
                setPrevConnections(_.cloneDeep(newConnections));
            }
        }
        loadRuleNodes()
    }, [])

    useEffect(() => {
        if (isChanged) {
            setElements((es) => es.concat(_.cloneDeep(newNode)));
        }
    }, [newNode.data])

    const onConnect = (params) => {
        setPrevConnections(_.cloneDeep(connections));
        console.log(params)

        setConnections((els) => addEdge({...params, ...edgeStyle}, els));
        handleChange(true)

    }

    const onElementsRemove = (elementsToRemove) => {
        setElements((els) => removeElements(elementsToRemove, els));
        handleChange(true)

    }

    const onLoad = (_reactFlowInstance) => {
        setReactFlowInstance(_reactFlowInstance);
    }

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (event) => {
        event.preventDefault();

        handleChange(true)

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/type');

        const ruleNodeDescriptorString = event.dataTransfer.getData('application/ruleNodeDescriptor');
        setRuleNodeDescriptor(JSON.parse(ruleNodeDescriptorString))

        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });

        newNode.id = getId();
        newNode.type = type;
        newNode.position = position;
        setNewNode(newNode);

        setOpenCreateRuleNode(true);
    };

    function onNodeDragStop(event, node) {
        const index = findIndex(elements, element => element && element.id === node.id)
        if (index !== -1) {
            elements[index] = node;
            setElements(elements)
        }
        handleChange(true)
    }

    const onElementClick = (event, element) => console.log('click', element);

    const handleChange = (change) => {
        setIsChanged(change)
        setBackgroundColorButton(change ? 'red' : '#666')
    }

    const handleCreateRuleNodes = async () => {
        const ruleNodes = elements.map(ruleNode => convertToRuleNode(ruleNode));
        const relations = connections.map(connection => convertToRelation(connection, elements))
        await RuleChainService.createRuleNodes({ruleChainId: ruleChain.id, ruleNodes, relations})
    }

    const handleButtonCheck = () => {
        if (isChanged) {
            handleChange(false);
            handleCreateRuleNodes();

            // update previous node and connections
            setPrevElements(_.cloneDeep(elements))
            setPrevConnections(_.cloneDeep(connections))
        }
    }

    const handleButtonClose = () => {
        if (isChanged) {
            handleChange(false)

            // revert to previous node and connections
            setElements(_.cloneDeep(prevElements))
            setConnections(_.cloneDeep(prevConnections))
        }
    }

    return (
        <div>
            <CreateRuleNodeModal
                openCreateRuleNode={openCreateRuleNode}
                setOpenCreateRuleNode={setOpenCreateRuleNode}
                newNode={newNode}
                setNewNode={setNewNode}
                ruleNodeDescriptor={ruleNodeDescriptor}
            />
            <div className={"drag-n-drop"} style={{height: "100vh"}}>
                <SideBarReactFlow/>
                <ReactFlowProvider>
                    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                        <ReactFlow
                            elements={elements.concat(connections)}
                            onElementClick={onElementClick}
                            onElementsRemove={onElementsRemove}
                            onConnect={onConnect}
                            onLoad={onLoad}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            onNodeDragStop={onNodeDragStop}
                            snapToGrid={true}
                            key="edges"
                            style={{position: 'fixed'}}
                        >
                            <Background/>
                        </ReactFlow>
                        <Fab
                            icon={<Icon type="check"/>}
                            style={{right: 80, bottom: 0}}
                            event={'click'}
                            onClick={handleButtonCheck}
                            mainButtonStyles={{backgroundColor: backgroundColorButton}}
                        />
                        <Fab
                            icon={<Icon type="close"/>}
                            style={{right: 0, bottom: 0}}
                            event={'click'}
                            onClick={handleButtonClose}
                            mainButtonStyles={{backgroundColor: backgroundColorButton}}
                        />
                    </div>
                </ReactFlowProvider>
            </div>
        </div>
    );

}
export default RuleNodes
