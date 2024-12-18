import React, { useState } from 'react'
import ToolBar from "./components/ToolBar"
import SlideBar from "./components/SlideBar"
import MainCanvas from "./components/MainCanvas"

function App() {

  const [canvas, setCanvas] = useState(null)



  const ipcHandle = () => window.electron.ipcRenderer.send('ping')
  return (
    <>
    <div className="The-One-Container">
      <div className="ToolBar">
        <ToolBar canvas={canvas} />
      </div>
      <div className="Canvas-SlideBar">
        <SlideBar />
        <MainCanvas canavs={canvas} setCanvas={setCanvas} />
      </div>
    </div>
    </>
  )
}
export default App


