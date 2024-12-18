import React from 'react';
import { Rect,Circle,Triangle } from 'fabric';
import { IconButton } from 'blocksin-system';
import { SquareIcon, CircleIcon,TriangleIcon } from 'sebikostudio-icons';

export default function ToolBar({ canvas }) {
  const addRectangle = () => {
    if (canvas) {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20
      })
      canvas.add(rect)
    }
  }

  const addCircle = () => {
    if (canvas) {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: 'blue',
        radius: 10
      })
      canvas.add(circle)
    }
  }

  const addTriangle = () => {
    if (canvas) {
      const triangle = new Triangle({
        left: 100,
        top: 100,
        fill: 'green',
        width: 20,
        height: 20
      })
      canvas.add(triangle)
    }
  }

  return (
    <div className='Tool-Bar'>
      <IconButton className='Tool-Bar-Add-Shape' onClick={addRectangle} variant="ghost" size="medium">
        <SquareIcon />
      </IconButton>

      <IconButton className='Tool-Bar-Add-Shape' onClick={addCircle} variant="ghost" size="medium">
        <CircleIcon />
      </IconButton>

      <IconButton className='Tool-Bar-Add-Shape' onClick={addTriangle} variant="ghost" size="medium">
        <TriangleIcon />
      </IconButton>

      <p>toolbar</p>
    </div>
  )
}
