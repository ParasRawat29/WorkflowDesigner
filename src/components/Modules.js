import React, { useEffect, useState } from "react";
import { getModules } from "./logic";
import Loader from "./Loader";

function Modules() {
  const [loading, setLoading] = useState(false);
  const [moduleList, setModuleList] = useState([]);
  const [currPage, setCurrPage] = useState(1);

  const onDragStart = (event, node) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify(node));
    event.dataTransfer.effectAllowed = "move";
  };

  const handlePageChange = (number) => {
    if (number === -1) {
      if (currPage === 1) return;
      else setCurrPage((pre) => pre - 1);
    } else {
      if (currPage >= Number(99 / 8)) return;
      setCurrPage((pre) => pre + 1);
    }
  };

  useEffect(() => {
    setLoading(true);
    getModules(currPage).then((data) => {
      console.log(data);
      setModuleList(data);
      setLoading(false);
    });
  }, [currPage]);
  return (
    <div className="modulesWrapper">
      <h4 style={{}}>Modules</h4>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ padding: "0 10px" }}>
          {moduleList.map((item) => {
            return (
              <div
                className="module"
                onDragStart={(event) => onDragStart(event, item)}
                draggable
              >
                <p className="types">{item.input_type}</p>
                <p className="moduleName">{item.name}</p>
                <p className="types">{item.output_type}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="pageHandlerContainer">
        <button className="pageButton" onClick={() => handlePageChange(-1)}>
          <i class="bi bi-arrow-left-circle"></i>
        </button>
        <span className="currPage">{currPage}</span>
        <button className="pageButton" onClick={() => handlePageChange(1)}>
          <i class="bi bi-arrow-right-circle"></i>
        </button>
      </div>
    </div>
  );
}

export default Modules;
