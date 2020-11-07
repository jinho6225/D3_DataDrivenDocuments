import React, { useState } from "react";
import LineChart from "./LineChart"

function Home() {
    const [data, setDate] = useState([25,30, 45, 60, 54, 60, 45])
    const [data2, setDate2] = useState([55,40, 35, 30, 34, 20, 25])

    return (
        <>
            {/* <Hello onDrop={(result) => {
                setData([...data, result])
            }} /> */}
            <h1>LineChart</h1>
            <LineChart data={data} data2={data2}/>
        </>
    );
}

export default Home;