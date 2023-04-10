import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function ListTable({ data }) {
  const navigate = useNavigate();
  const handleWorkflowClick = useCallback((id) => {
    navigate(`/workflow/${id}`);
  }, []);

  return (
    <div className="tableWrapper">
      <table>
        <thead>
          <tr className="headingRow">
            <th>Name</th>
            <th>Input Type</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id} onClick={() => handleWorkflowClick(item.id)}>
                <td>{item.name}</td>
                <td>{item.input_type}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListTable;
