import { React, useState, useEffect } from 'react'
import { TrashIcon } from 'sebikostudio-icons'

export default function Delate({ canvas }) {
  const [selectedObject, setSelectedObject] = useState(null)

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
  }

  const handleDelete = () => {
    if (selectedObject) {
      canvas.remove(selectedObject)
      canvas.discardActiveObject()
    }
  }

  return (
    <button onClick={handleDelete}>
      <TrashIcon />
    </button>
  )
}
