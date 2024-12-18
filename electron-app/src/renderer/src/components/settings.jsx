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

  const handleWidthChange = (event) => {}
  const handleHeightChange = (event) => {}
  const handleDiameterChange = (event) => {}
  const handleColorChange = (event) => {}

  return (
    <div className="Settings-panel">
      {selectedObject && selectedObject.type === 'rect' && (
        <>
          <Input fluid label="Width" value={width} />
          <Input fluid label="Height" value={height} />
          <Input fluid label="Color" value={color} />
        </>
      )}
    </div>
  )
}
