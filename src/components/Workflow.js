import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWorkflow } from "./logic";
import Modules from "./Modules";
import Flow from "./Flow";
import Loader from "./Loader";

function Workflow() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getWorkflow(id).then((data) => {
      console.log(data);
      setData(data);
      setLoading(false);
    });
  }, [id]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="workflowPageWrapper">
          <header>
            <h4>Workflow Name : {data.name}</h4>
          </header>
          <section>
            <Modules />
            <Flow input_type={data.input_type} />
          </section>
        </div>
      )}
    </div>
  );
}

export default Workflow;
