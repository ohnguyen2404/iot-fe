import React, {useEffect, useRef, useState} from 'react'
import ReactFlow, {
    addEdge,
    Background,
    Controls,
    MiniMap,
    ReactFlowProvider,
    removeElements
} from "react-flow-renderer";
import '../react-flow/DragNDrop.css';
import SideBarReactFlow from "../react-flow/SideBarReactFlow";
import {RuleChainService} from "../../services";

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

let id = 0;
const getId = () => `dndnode_${id++}`;

const convertToReactFlow = (ruleNode, index) => {
    return {
        id: index.toString(),
        data: {label: ruleNode.name},
        position: JSON.parse(ruleNode.additionalInfo),
        targetPosition: "left",
        sourcePosition: 'right',
    }
}

const convertToReactFlowRelation = (relation) => {
    return {
        id: relation.fromIndex.toString() + relation.toIndex.toString(),
        source: relation.fromIndex.toString(),
        target: relation.toIndex.toString(),
        label: relation.name,
        ...edgeStyle
    }
}

const OpenRuleNodes = (props) => {
    // const {openRuleNodes} = useSelector((state) => state.ruleChains);
    const ruleChain = {
        id: "55b5a9c1-0676-47bd-b9e6-b4c23988b5b7",
        createdAt: "2022-01-13T18:12:47.773",
        updatedAt: "2022-01-13T18:12:47.773",
        createUid: "1931d829-70da-480e-9ccb-f104a156219f",
        updateUid: null,
        deleted: null,
        extraInfo: null,
        tenantId: "1931d829-70da-480e-9ccb-f104a156219f",
        name: "Temperature Simulator",
        firstRuleNodeId: null,
        root: true
    };

    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState(initialElements);

    useEffect(() => {
        const loadRuleNodes = async () => {
            const data = await RuleChainService.getRuleNodes(ruleChain.id)

            if (data.ruleNodes.length > 0 && data.relations.length > 0) {
                const ruleNodes = data.ruleNodes.map((ruleNode, index) => {
                    return convertToReactFlow(ruleNode, index)
                })

                const relations = data.relations.map(relation => {
                    return convertToReactFlowRelation(relation)
                })

                setElements([...ruleNodes, ...relations])
            }
        }
        loadRuleNodes()
    }, [])

    const onConnect = (params) => setElements((els) => addEdge({...params, ...edgeStyle}, els));
    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));

    const onLoad = (_reactFlowInstance) =>
        setReactFlowInstance(_reactFlowInstance);

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (event) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        const newNode = {
            id: getId(),
            type,
            position,
            data: {label: `${type} node`},
            targetPosition: "left",
            sourcePosition: 'right',
        };
        setElements((es) => es.concat(newNode));
    };

    const onNodeDragStop = (event, node) => console.log('drag stop', node);
    const onElementClick = (event, element) => console.log('click', element);

    return (
        <div className={"drag-n-drop"} style={{height: '100vh'}}>
            <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        elements={elements}
                        onElementClick={onElementClick}
                        onElementsRemove={onElementsRemove}
                        onConnect={onConnect}
                        onNodeDragStop={onNodeDragStop}
                        onLoad={onLoad}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        snapToGrid={true}
                        key="edges"
                    >
                        <MiniMap/>
                        <Controls/>
                        <Background/>
                    </ReactFlow>
                </div>
                <SideBarReactFlow/>
            </ReactFlowProvider>
        </div>

    );

}
export default OpenRuleNodes
