import React, { useState } from "react";
import "./App.css";
import Barchart from "./Barchart";

function App() {
  const [data, setData] = useState([12, 23, 37, 90, 33, 110, 44]);

  return (
    <>
      <Barchart data={data} />
      <button onClick={() => setData(data.map((val) => val + 5))}>Add</button>
      <button onClick={() => setData(data.filter((val) => val < 35))}>
        Filter
      </button>
      <button
        onClick={() => setData([...data, Math.round(Math.random() * 100)])}
      >
        Add data
      </button>      
    </>
  );
}
export default App;
