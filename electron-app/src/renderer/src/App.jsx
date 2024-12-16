import ToolBar from "./components/ToolBar"
import SlideBar from "./components/SlideBar"
import MainCanvas from "./components/MainCanvas"

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')
  return (
    <>
    <div className="The-One-Container">
      <ToolBar />
      <div className="Canvas-SlideBar">
        <SlideBar />
        <MainCanvas />
      </div>
    </div>
    </>
  )
}
export default App


