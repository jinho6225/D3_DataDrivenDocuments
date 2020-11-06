import React, { useState } from "react";
import "./App.css";
import { filterDataByDate } from "./manipulation";
import Hello from "./Hello";


function App() {
    const [data, setData] = useState([]);
    console.log(data, 'data')
    // console.log(timeStampToDate(1596464356000))
    // console.log(timeStampToDate(1598418771000))
    
    let dataOne = filterDataByDate(data)
    console.log(dataOne, 'dataOne')

  return (
    <>
        <Hello onDrop={(result) => {
            setData([...data, result])
        }} />
        <h1>BarChart</h1>
        {/* <BarChart />  */}
        
    </>
  );
}
export default App;
