import React from "react";
import { Handle } from "reactflow";

function CustomNode(data) {
  const { input_type, output_type, name, valid } = data.data;
  const isValid = data.id == 0 || valid;
  return (
    <div
      className="customNode"
      style={{
        border: isValid ? "1px solid black" : "1px solid indianred",
      }}
    >
      {Number(data.id) !== 0 && (
        <Handle type="target" position="top" isConnectable="true" />
      )}
      <div className="types">
        {data.id == 0 ? (
          <>
            <i class="bi bi-arrow-right-circle-fill"></i>
          </>
        ) : (
          input_type
        )}
      </div>
      <div
        className="customNodeName"
        style={{
          borderLeft: isValid ? "1px solid #222222" : "1px solid indianred",
          borderRight: isValid ? "1px solid #222222" : "1px solid indianred",
        }}
      >
        {name}
      </div>
      <div className="types">{output_type}</div>
      <Handle type="source" position="bottom" isConnectable="true" />
    </div>
  );
}

export default CustomNode;
