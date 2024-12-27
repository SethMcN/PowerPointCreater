import React, { useState, useEffect } from 'react'
import { Input } from 'blocksin-system'
import { FontSizeIcon, TrashIcon } from 'sebikostudio-icons'

export default function Settings({ canvas }) {
  const [selectedObject, setSelectedObject] = useState(null)
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [diameter, setDiameter] = useState('')
  const [color, setColor] = useState('')
  const [fontSize, setFontSize] = useState('')

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
    } else if (object.type === 'triangle') {
      pass
    } else if (object.type === 'textbox') {
      setFontSize(object.fontSize)
      setColor(object.fill)
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

  const handleDelete = () => {
    if (selectedObject) {
      canvas.remove(selectedObject)
      canvas.discardActiveObject()
    }
  }

  const handleFontSizeChange = (event) => {
    const value = event.target.value.replace(/,/g, '')
    const intValue = parseInt(value, 10)

    setFontSize(intValue)

    if (selectedObject && selectedObject.type === 'textbox' && intValue > 0) {
      selectedObject.set({ fontSize: intValue })
      canvas.renderAll()
    }
  }

  const handleTextAlignChange = (event) => {
    const value = event.target.value

    if (selectedObject && selectedObject.type === 'textbox') {
      selectedObject.set({ textAlign: value })
      canvas.renderAll()
    }
  }

  const handleTextUnderline = () => {
    if (selectedObject && selectedObject.type === 'textbox') {
      selectedObject.set({ underline: !selectedObject.underline })
      canvas.renderAll()
    }
  }

  return (
    <div id="Settings-panel">
      <h2>Settings</h2>
      <button onClick={handleDelete}>
        <TrashIcon />
      </button>
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

      {selectedObject && selectedObject.type === 'textbox' && (
        <div className="TextBox-Settings">
          <div className="TextBox-Buttons">
            <select className="Text-Center" onChange={handleTextAlignChange}>
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
            <button onClick={handleTextUnderline}>U</button>
          </div>
          <Input label="Font size" value={fontSize} onChange={handleFontSizeChange} type="number" />
          <Input label="Color" value={color} onChange={handleColorChange} type="color" />
        </div>
      )}
      {!selectedObject && <p>Select an object to edit its properties</p>}
    </div>
  )
}
