import React, { useState } from "react";
import RacingBarChart from "./RacingBarChart";
import useInterval from "./useInterval";
import "./App.css";

const getRandomIndex = array => {
  return Math.floor(array.length * Math.random());
};

function App() {
  const [iteration, setIteration] = useState(0);
  const [start, setStart] = useState(false);
  const [data, setData] = useState([
    {
      name: "a",
      value: 10,
      color: "#f4efd3"
    },
    {
      name: "b",
      value: 15,
      color: "#cccccc"
    },
    {
      name: "c",
      value: 20,
      color: "#c2b0c9"
    },
    {
      name: "d",
      value: 25,
      color: "#9656a1"
    },
    {
      name: "e",
      value: 30,
      color: "#fa697c"
    },
    {
      name: "f",
      value: 35,
      color: "#fcc169"
    }
  ]);

  useInterval(() => {
    if (start) {
      const randomIndex = getRandomIndex(data);
      setData(
        data.map((entry, index) =>
          index === randomIndex
            ? {
                ...entry,
                value: entry.value + 10
              }
            : entry
        )
      );
      setIteration(iteration + 1);
    }
  }, 500);

  return (
    <>
      <h1>Racing Bar Chart</h1>
      <RacingBarChart data={data} />
      <button onClick={() => setStart(!start)}>
        {start ? "Stop the race" : "Start the race!"}
      </button>
      <p>Iteration: {iteration}</p>
    </>
  );
}

export default App;