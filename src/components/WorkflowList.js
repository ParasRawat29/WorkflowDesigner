import React, { useEffect, useState } from "react";
import { getWorkflowList } from "./logic";
import ListTable from "./ListTable";
import Loader from "./Loader";

function WorkflowList() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getWorkflowList().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      {loading && <Loader />}
      {!loading && (
        <>
          <h3
            style={{
              textAlign: "center",
              margin: "10px 0",
              fontFamily: "Arial",
            }}
          >
            Workflow List
          </h3>
          <ListTable data={data} />
        </>
      )}
    </div>
  );
}

export default WorkflowList;
