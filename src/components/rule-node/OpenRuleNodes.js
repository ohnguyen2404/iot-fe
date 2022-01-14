import React, {useEffect, useRef, useState} from 'react'
import ReactFlow, {addEdge, Background, Controls, ReactFlowProvider, removeElements} from "react-flow-renderer";
import '../react-flow/DragNDrop.css';
import SideBarReactFlow from "../react-flow/SideBarReactFlow";
import {RuleChainService} from "../../services";
import {useSelector} from "react-redux";
import CreateRuleNodeModal from "./CreateRuleNodeModal";

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

const initialElements = [
    // {
    //     id: 'edges-1',
    //     type: 'input',
    //     data: {label: 'Input 1'},
    //     position: {x: 0, y: 50},
    //     sourcePosition: 'right',
    // },
    // {
    //     id: 'edges-2',
    //     data: {label: 'Node 2'},
    //     position: {x: 300, y: 50},
    //     targetPosition: "left",
    //     sourcePosition: 'right',
    // },
    //
    // {
    //     id: 'edges-e1-2',
    //     source: 'edges-1',
    //     target: 'edges-2',
    //     label: 'bezier edge (default)',
    //
    //     ...edgeStyle
    // }
];


const convertToReactFlow = (ruleNode, index) => {
    return {
        id: index.toString(),
        data: {
            id: ruleNode.id,
            label: ruleNode.name,
            configuration: ruleNode.configuration,
            type: ruleNode.type
        },
        type: 'default',
        position: JSON.parse(ruleNode.additionalInfo),
        targetPosition: "left",
        sourcePosition: 'right',
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

const convertToRuleNode = (reactFlowNode) => {
    const ruleNode = {
        type: reactFlowNode.data.type,
        name: reactFlowNode.data.label,
        additionalInfo: JSON.stringify(reactFlowNode.position),
        configuration: reactFlowNode.data.configuration
    }
    if (reactFlowNode.data.id) {
        ruleNode.id = reactFlowNode.data.id;
    }

    return ruleNode;
}

const convertToRelation = (reactFlowConnection) => {
    return {
        fromIndex: parseInt(reactFlowConnection.source),
        toIndex: parseInt(reactFlowConnection.target),
        name: reactFlowConnection.label
    }
}

const OpenRuleNodes = () => {
    const {openRuleNodes} = useSelector((state) => state.ruleChains);
    const {ruleChain} = openRuleNodes;

    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState([]);
    const [connections, setConnections] = useState([]);
    const [newNode, setNewNode] = useState({
        id: "",
        data: {
            label: "",
            configuration: "",
            type: ""
        },
        type: 'default',
        position: "",
        targetPosition: "left",
        sourcePosition: 'right',
    });

    const [openCreateRuleNode, setOpenCreateRuleNode] = useState(false);

    const getId = () => `${elements.length++}`;

    useEffect(() => {
        const loadRuleNodes = async () => {
            const {ruleNodes, relations} = await RuleChainService.getRuleNodes(ruleChain.id)

            if (ruleNodes !== null && relations !== null) {
                let newElements = ruleNodes.map((ruleNode, index) => {
                    return convertToReactFlow(ruleNode, index)
                })

                let newConnections = relations.map(relation => {
                    return convertToReactFlowConnection(relation)
                });

                setElements(newElements)
                setConnections(newConnections);
            }
        }
        loadRuleNodes()
    }, [])

    const onConnect = (params) => {
        setElements((els) => addEdge({...params, ...edgeStyle}, els));
    }

    const onElementsRemove = (elementsToRemove) => {
        setElements((els) => removeElements(elementsToRemove, els));
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

        handleOpenCreateRuleNode(true)

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });

        newNode.id = getId();
        newNode.type = type;
        newNode.position = position;
        setNewNode(newNode);
    };

    useEffect(() => {
        setElements((es) => es.concat(newNode));
    }, [newNode.data])

    const onElementClick = (event, element) => console.log('click', element);

    const handleOpenCreateRuleNode = (value) => {
        setOpenCreateRuleNode(value);
    };

    const handleCreateRuleNodes = async () => {
        const ruleNodes = elements.map(ruleNode => convertToRuleNode(ruleNode));
        const relations = connections.map(connection => convertToRelation(connection))
        await RuleChainService.createRuleNodes({ruleChainId: ruleChain.id, ruleNodes, relations});
    }

    return (
        <div>
            <CreateRuleNodeModal
                openCreateRuleNode={openCreateRuleNode}
                handleOpenCreateRuleNode={handleOpenCreateRuleNode}
                newNode={newNode}
                setNewNode={setNewNode}
                reactFlowWrapper={reactFlowWrapper}
            />
            <div className={"drag-n-drop"} style={{height: '100vh'}}>
                <ReactFlowProvider>
                    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                        <ReactFlow
                            elements={[...elements, ...connections]}
                            onElementClick={onElementClick}
                            onElementsRemove={onElementsRemove}
                            onConnect={onConnect}
                            onLoad={onLoad}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            snapToGrid={true}
                            key="edges"
                        >
                            {/*<MiniMap/>*/}
                            <Controls/>
                            <Background/>
                        </ReactFlow>
                    </div>
                    <SideBarReactFlow/>
                </ReactFlowProvider>
            </div>
        </div>
    );

}
export default OpenRuleNodes
