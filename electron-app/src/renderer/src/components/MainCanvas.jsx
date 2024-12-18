import React, { useRef, useState, useEffect } from 'react'
import { Canvas } from 'fabric'
import Settings from './settings'

export default function MainCanvas({ canvas,setCanvas }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current) {
      let width = window.innerWidth
      let height = window.innerHeight
      const initCanvas = new Canvas(canvasRef.current, {
        width: (width * 0.75),
        height: (height * 0.75),
      })

      initCanvas.backgroundColor = '#fff'
      initCanvas.renderAll()

      setCanvas(initCanvas)

      return () => {
        initCanvas.dispose()
      }
    }
  }, [setCanvas])

  return (
    <div className='Container-Canvas'>
      <div className='Container-Canvas'>
        <canvas id='canvas' ref={canvasRef}></canvas>
        <Settings canvas={canvas} />
      </div>
    </div>
  )
}
