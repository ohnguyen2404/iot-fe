import React, {useEffect, useRef, useState} from 'react'
import ReactFlow, {addEdge, Background, ReactFlowProvider, removeElements} from "react-flow-renderer";
import '../react-flow/DragNDrop.css';
import SideBarReactFlow from "../react-flow/SideBarReactFlow";
import {RuleChainService} from "../../services";
import {useSelector} from "react-redux";
import CreateRuleNodeModal from "./CreateRuleNodeModal";
import _ from "lodash";
import {Fab} from "react-tiny-fab";
import {Icon, message} from "antd";
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

const getId = () => window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);

const inputElement = {
    id: "inputId",
    type: 'input',
    data: {label: 'Input'},
    position: {x: 30, y: 110},
    sourcePosition: 'right',
}

const initConnection = {
    id: getId(),
    source: "inputId",
    ...edgeStyle
}

const RuleNodes = () => {
    const {openRuleNodes} = useSelector((state) => state.ruleChains);
    const {ruleChain} = openRuleNodes;

    const reactFlowWrapper = useRef(null);

    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const [inputConnection, setInputConnection] = useState(initConnection);

    const [elements, setElements] = useState([]);
    const [prevElements, setPrevElements] = useState([]);

    const [firstElementIndex, setFirstElementIndex] = useState(-1);
    const [prevFirstElementIndex, setPrevFirstElementIndex] = useState(-1);

    const [connections, setConnections] = useState([]);
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


    useEffect(() => {
        const loadRuleNodes = async () => {
            const {ruleNodes, relations, firstRuleNodeIndex} = await RuleChainService.getRuleNodes(ruleChain.id)

            if (firstRuleNodeIndex !== null && firstRuleNodeIndex !== -1) {
                setFirstElementIndex(firstRuleNodeIndex)
                setPrevFirstElementIndex(firstRuleNodeIndex)
            }

            if (ruleNodes !== null) {
                let newElements = ruleNodes.map((ruleNode, index) => {
                    return convertToReactFlow(ruleNode, index)
                })

                setElements((es) => es.concat(newElements));
                setPrevElements(_.cloneDeep(newElements));
            }

            if (relations !== null) {
                let newConnections = relations.map(relation => {
                    return convertToReactFlowConnection(relation)
                });

                setConnections((es) => es.concat(newConnections));
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

    useEffect(() => {
        if (firstElementIndex !== -1) {
            setInputConnection({
                ...inputConnection,
                target: elements.length !== 0 ? elements[firstElementIndex]?.id : `${firstElementIndex}`
            })
        }
    }, [firstElementIndex])

    const onConnect = (params) => {
        setPrevConnections(_.cloneDeep(connections));
        if (params.source === 'inputId') {
            setPrevFirstElementIndex(firstElementIndex)
            setFirstElementIndex(elements.map(el => el.id).indexOf(params.target))

        } else {
            setConnections((els) => addEdge({...params, ...edgeStyle}, els));
        }
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

    const handleCreateRuleNodes = () => {
        const ruleNodes = elements
            .map(ruleNode => convertToRuleNode(ruleNode));

        const relations = connections
            .map(connection => convertToRelation(connection, elements));

        RuleChainService
            .createRuleNodes({
                ruleChainId: ruleChain.id,
                ruleNodes,
                relations,
                firstRuleNodeIndex: firstElementIndex
            })
            .then(r => message.success("Save successfully"))
            .catch(err => message.error("Save unsuccessfully"))
    }

    const handleButtonCheck = () => {
        if (isChanged) {
            handleChange(false);
            handleCreateRuleNodes();

            // update previous node and connections
            setPrevElements(_.cloneDeep(elements))
            setPrevConnections(_.cloneDeep(connections))
            setPrevFirstElementIndex(_.cloneDeep(firstElementIndex))
        }
    }

    const handleButtonClose = () => {
        if (isChanged) {
            handleChange(false)

            // revert to previous node and connections
            setElements(_.cloneDeep(prevElements))
            setConnections(_.cloneDeep(prevConnections))
            setFirstElementIndex(_.cloneDeep(prevFirstElementIndex))
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
                            elements={elements.concat([inputElement, inputConnection, ...connections])}
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
