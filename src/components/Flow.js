import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

import CustomNode from "./CustomNode";

const nodeTypes = {
  customNode: CustomNode,
};

const Flow = ({ input_type }) => {
  const initialNodes = [
    {
      id: "0",
      type: "customNode",
      data: { name: "Input", output_type: input_type },
      position: { x: 0, y: 5 },
    },
  ];

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const id = useRef(1);

  const getId = () => {
    id.current = id.current + 1;
    return id.current;
  };
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => {
        const { target } = params;
        const targetNodeExists = nodes.find((element) => {
          return element.id == target;
        });

        targetNodeExists.data.valid = true;
        targetNodeExists.selected = true;
        const temp = nodes.filter((item) => item.id != target);
        temp.push(targetNodeExists);

        setNodes(temp);

        return addEdge(params, eds);
      }),
    [nodes, setEdges, setNodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      let node = event.dataTransfer.getData("application/reactflow");
      node = JSON.parse(node);
      // check if the dropped element is valid
      if (typeof node === "undefined" || !node) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const { input_type, output_type, name } = node;

      const newNode = {
        id: getId().toLocaleString(),
        type: "customNode",
        position,
        data: { name, input_type, output_type, valid: false },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  const handleEdgeDelete = (data) => {
    const deletedEdge = data[0];
    const { target } = deletedEdge;
    const targetNodeExists = nodes.find((element) => {
      return element.id == target;
    });

    targetNodeExists.data.valid = false;
    targetNodeExists.selected = true;
    const temp = nodes.filter((item) => item.id != target);
    temp.push(targetNodeExists);
    setNodes(temp);
  };

  return (
    <div className="flowWrapper">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onEdgesDelete={handleEdgeDelete}
            onDragOver={onDragOver}
            fitView
          >
            <Background variant="dots" />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default Flow;
