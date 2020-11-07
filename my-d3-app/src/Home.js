import React, { useState } from "react";
import LineChart from "./LineChart"

function Home() {
    const [data, setDate] = useState([25,30, 45, 60, 54, 60, 45])

    return (
        <>
            {/* <Hello onDrop={(result) => {
                setData([...data, result])
            }} /> */}
            <h1>LineChart</h1>
            <LineChart data={data} />
        </>
    );
}

export default Home;