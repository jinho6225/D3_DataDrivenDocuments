import React, { useState } from "react";
import "./App.css";
import PieChart from "./PieChart";

const data = [{ label: 'Apples', value: 10 }, { label: 'Oranges', value: 20 }];

function App() {

  return (
    <>
        <h1>Pie Chart</h1>
        <PieChart data={data}/>
    </>
  );
}
export default App;
