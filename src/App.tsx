import React, { useState } from "react";

const App = () => {

    const[c, sc] = useState<number>(0);
    
    return <div>
        <h1>Hello Webpack</h1>
        <button onClick={() => {sc(c + 1)}}> {c} click me</button>
    </div>
}

export default App;