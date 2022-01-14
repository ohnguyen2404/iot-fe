import React from 'react';
import Sider from "antd/es/layout/Sider";

export default () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <Sider style={{background: "#fff"}} className="sidebar-right d-flex justify-content-center">
            <div className="react-flow__node-input m-b-10" onDragStart={(event) => onDragStart(event, 'input')} draggable>
                Input Node
            </div>
            <div className="react-flow__node-default m-b-10" onDragStart={(event) => onDragStart(event, 'default')} draggable>
                Default Node
            </div>
            <div className="react-flow__node-output m-b-10" onDragStart={(event) => onDragStart(event, 'output')} draggable>
                Output Node
            </div>
        </Sider>
    );
};