import React, {useEffect, useRef, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {usePdf} from "./hooks/usePdf";
import demoPdf from "/demo.pdf"

function App() {
    const [count, setCount] = useState(0)
    const ref = React.useRef<HTMLDivElement>();


    const {} = usePdf({
        container: "container",
        src: demoPdf,
    })

    useEffect(() => {
        console.log(ref, 'ref.current')
    }, [])


    return (
        <div className="App" id={"container"} ref={ref} style={{width: "100px", height: 100}}>
            121
        </div>
    )
}

export default App
