import React, { useRef, useState, useEffect } from 'react'
import { Canvas } from 'fabric'
import { handleObjectMoving, clearGuidelines } from './snappingHelpers'

export default function MainCanvas({ setCanvas }) {
  const canvasRef = useRef(null)
  const [guidelines, setGuidelines] = useState([])

  useEffect(() => {
    if (canvasRef.current) {
      let width = window.innerWidth
      let height = window.innerHeight
      const initCanvas = new Canvas(canvasRef.current, {
        width: width * 0.75,
        height: height * 0.75
      })

      initCanvas.backgroundColor = '#fff'
      initCanvas.renderAll()

      setCanvas(initCanvas)

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
      </div>
    </div>
  )
}
