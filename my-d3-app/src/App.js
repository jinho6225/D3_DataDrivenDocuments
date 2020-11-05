import React, { useState } from 'react';
import CSVReader from 'react-csv-reader'


function App() {
    const [data, setData] = useState([])

    console.log(data)
    return <div>hello
        <CSVReader onFileLoaded={(data, fileInfo) => {
            setData(data.slice(1))
            console.dir(data, fileInfo)
        }} />
    </div>
}
export default App;