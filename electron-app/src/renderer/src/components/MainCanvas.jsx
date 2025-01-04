import React, { useRef, useState, useEffect } from 'react'
import { Canvas } from 'fabric'
import { handleObjectMoving, clearGuidelines } from './snappingHelpers'

export default function MainCanvas({ canvas, setCanvas, canvases, setCanvases }) {
  const canvasRef = useRef(null)
  const [guidelines, setGuidelines] = useState([])

  const addSlide = () => {
    console.log(canvas)
    // Retrieve all objects on the canvas
    const allObjects = canvas.getObjects()

    // Iterate over the objects and perform actions
    allObjects.forEach((obj, index) => {
      console.log(`Object ${index}:`, obj)
      obj.set({ visible: false })
    })

    const layer = canvas.getObjects()
    setCanvases((canvases) => [...canvases, layer])

    canvas.renderAll()
  }

  const nextSlide = () => {
    // first hide all objects on current layer

    // Retrieve all objects on the canvas
    const allObjects = canvas.getObjects()

    // Iterate over the objects and perform actions
    allObjects.forEach((obj, index) => {
      console.log(`Object ${index}:`, obj)
      obj.set({ visible: false })
    })

    // then show all objects on next layer
    const layer = canvases.indexof(canvas).getObjects()
    layer.forEach((obj, index) => {
      console.log(`Object ${index}:`, obj)
      obj.set({ visible: true })
    })

    canvas.renderAll()
  }

  useEffect(() => {
    if (canvasRef.current) {
      let width = window.innerWidth
      let height = window.innerHeight
      let initCanvas = new Canvas(canvasRef.current, {
        width: width * 0.75,
        height: height * 0.75
      })

      initCanvas.backgroundColor = '#fff'
      initCanvas.renderAll()

      setCanvas(initCanvas)
      setCanvases((canvases) => [...canvases, initCanvas])

      initCanvas.on('object:moving', (event) => {
        handleObjectMoving(initCanvas, event.target, guidelines, setGuidelines)
      })

      initCanvas.on('object:modified', () => {
        clearGuidelines(initCanvas, guidelines, setGuidelines)
      })

      return () => {
        initCanvas.dispose()
      }
    }
  }, [setCanvas, guidelines])

  return (
    <div className="Container-Canvas">
      <div className="Container-Canvas">
        <canvas id="canvas" ref={canvasRef}></canvas>
        <button onClick={addSlide}>Add Slide</button>
        <button onClick={nextSlide}>Next Slide</button>
      </div>
    </div>
  )
}
