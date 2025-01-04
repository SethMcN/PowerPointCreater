import React, { useState } from 'react'
import ToolBar from './components/ToolBar'
import SlideBar from './components/SlideBar'
import MainCanvas from './components/MainCanvas'

function App() {
  const [canvas, setCanvas] = useState(null)
  const [canvases, setCanvases] = useState([])

  const ipcHandle = () => window.electron.ipcRenderer.send('ping')
  return (
    <>
      <div className="The-One-Container">
        <div className="ToolBar">
          <ToolBar canvas={canvas} />
        </div>
        <div className="Canvas-SlideBar">
          <SlideBar />
          <MainCanvas
            canvas={canvas}
            setCanvas={setCanvas}
            canvases={canvases}
            setCanvases={setCanvases}
          />
        </div>
      </div>
    </>
  )
}
export default App
