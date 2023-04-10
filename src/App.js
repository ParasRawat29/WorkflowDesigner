import React from "react";
import { Route, Routes } from "react-router-dom";
import WorkflowList from "./components/WorkflowList";
import Workflow from "./components/Workflow";
import "./App.css";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WorkflowList />} />
        <Route path="/workflow/:id" element={<Workflow />} />
      </Routes>
    </div>
  );
}

export default App;
