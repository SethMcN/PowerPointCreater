import React, { useState, useEffect } from 'react'
import { Input } from 'blocksin-system'

export default function Settings({ canvas }) {
  const [selectedObject, setSelectedObject] = useState(null)
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [diameter, setDiameter] = useState('')
  const [color, setColor] = useState('')

  useEffect(() => {
    if (canvas) {
      canvas.on('selection:created', (event) => {
        handleObjectSelection(event.selected[0])
      })

      canvas.on('selection:updated', (event) => {
        handleObjectSelection(event.selected[0])
      })

      canvas.on('selection:cleared', () => {
        handleObjectSelection(null)
        clearSettings()
      })

      canvas.on('object:modified', (event) => {
        handleObjectSelection(event.target)
      })

      canvas.on('object:scaling', (event) => {
        handleObjectSelection(event.target)
      })
    }
  }, [canvas])

  const handleObjectSelection = (object) => {
    if (!object) return

    setSelectedObject(object)

    if (object.type === 'rect') {
      setWidth(Math.round(object.width * object.scaleX))
      setHeight(Math.round(object.height * object.scaleY))
      setColor(object.fill)
      setDiameter('')
    } else if (object.type === 'circle') {
      setDiameter(Math.round(object.radius * 2 * object.scaleX))
      setColor(object.fill)
      setWidth('')
      setHeight('')
    }
  }

  const clearSettings = () => {
    setWidth('')
    setHeight('')
    setDiameter('')
    setColor('')
  }

  const handleWidthChange = (event) => {
    const value = event.target.value.replace(/,/g, '')
    const intValue = parseInt(value, 10)

    setWidth(intValue)

    if (selectedObject && selectedObject.type === 'rect' && intValue > 0) {
      selectedObject.set({ width: intValue / selectedObject.scaleX })
      canvas.renderAll()
    }
  }
  const handleHeightChange = (event) => {
    const value = event.target.value.replace(/,/g, '')
    const intValue = parseInt(value, 10)

    setHeight(intValue)

    if (selectedObject && selectedObject.type === 'rect' && intValue > 0) {
      selectedObject.set({ height: intValue / selectedObject.scaleY })
      canvas.renderAll()
    }
  }
  const handleDiameterChange = (event) => {
    const value = event.target.value.replace(/,/g, '')
    const intValue = parseInt(value, 10)

    setDiameter(intValue)

    if (selectedObject && selectedObject.type === 'circle' && intValue > 0) {
      selectedObject.set({ radius: intValue / 2 / selectedObject.scaleX })
      canvas.renderAll()
    }
  }
  const handleColorChange = (event) => {
    const value = event.target.value

    setColor(value)

    if (selectedObject) {
      selectedObject.set({ fill: value })
      canvas.renderAll()
    }
  }

  return (
    <div id="Settings-panel">
      {selectedObject && selectedObject.type === 'rect' && (
        <>
          <Input label="Width" value={width} onChange={handleWidthChange} type="number" />
          <Input label="Height" value={height} onChange={handleHeightChange} type="number" />
          <Input label="Color" value={color} onChange={handleColorChange} type="color" />
        </>
      )}
      {selectedObject && selectedObject.type === 'circle' && (
        <>
          <Input label="Diameter" value={diameter} onChange={handleDiameterChange} type="number" />
          <Input label="Color" value={color} onChange={handleColorChange} type="color" />
        </>
      )}

      {selectedObject && selectedObject.type === 'triangle' && (
        <>
          <Input label="Width" value={width} onChange={handleWidthChange} type="number" />
          <Input label="Height" value={height} onChange={handleHeightChange} type="number" />
          <Input label="Color" value={color} onChange={handleColorChange} type="color" />
        </>
      )}

      {selectedObject && selectedObject.type === 'polygon' && (
        <>
          <Input label="Color" value={color} onChange={handleColorChange} type="color" />
        </>
      )}

      {selectedObject && selectedObject.type === 'line' && (
        <>
          <Input label="Color" value={color} onChange={handleColorChange} type="color" />
        </>
      )}

      {!selectedObject && <p>Select an object to edit its properties</p>}
    </div>
  )
}
