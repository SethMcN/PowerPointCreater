import React from 'react'
import { Rect, Circle, Triangle, Polygon, Line } from 'fabric'
import { IconButton } from 'blocksin-system'
import {
  SquareIcon,
  CircleIcon,
  TriangleIcon,
  OctagonIcon,
  BorderSolidIcon,
  StarFilledIcon
} from 'sebikostudio-icons'
import Settings from './settings'

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
  const addOctagon = () => {
    if (canvas) {
      const points = [
        { x: 30, y: 0 },
        { x: 70, y: 0 },
        { x: 100, y: 30 },
        { x: 100, y: 70 },
        { x: 70, y: 100 },
        { x: 30, y: 100 },
        { x: 0, y: 70 },
        { x: 0, y: 30 }
      ]
      const octagon = new Polygon(points, {
        left: 100,
        top: 100,
        fill: 'purple'
      })
      canvas.add(octagon)
    }
  }

  const addLine = () => {
    if (canvas) {
      const line = new Line([50, 100, 200, 200], {
        left: 100,
        top: 100,
        stroke: 'black'
      })
      canvas.add(line)
    }
  }

  const addStar = () => {
    if (canvas) {
      const points = [
        { x: 50, y: 0 },
        { x: 61, y: 35 },
        { x: 98, y: 35 },
        { x: 68, y: 57 },
        { x: 79, y: 91 },
        { x: 50, y: 70 },
        { x: 21, y: 91 },
        { x: 32, y: 57 },
        { x: 2, y: 35 },
        { x: 39, y: 35 }
      ]
      const star = new Polygon(points, {
        left: 100,
        top: 100,
        fill: 'yellow'
      })
      canvas.add(star)
    }
  }

  return (
    <div className="Tool-Bar">
      <div className="Tool-Bar-Dropdown">
        <button className="Tool-Bar-Dropdown-Button">Add Shape</button>
        <div className="Tool-Bar-Dropdown-Content">
          <IconButton
            className="Tool-Bar-Add-Shape"
            onClick={addRectangle}
            variant="ghost"
            size="medium"
          >
            <SquareIcon />
          </IconButton>

          <IconButton
            className="Tool-Bar-Add-Shape"
            onClick={addCircle}
            variant="ghost"
            size="medium"
          >
            <CircleIcon />
          </IconButton>

          <IconButton
            className="Tool-Bar-Add-Shape"
            onClick={addTriangle}
            variant="ghost"
            size="medium"
          >
            <TriangleIcon />
          </IconButton>

          <IconButton
            className="Tool-Bar-Add-Shape"
            onClick={addOctagon}
            variant="ghost"
            size="medium"
          >
            <OctagonIcon />
          </IconButton>

          <IconButton
            className="Tool-Bar-Add-Shape"
            onClick={addLine}
            variant="ghost"
            size="medium"
          >
            <BorderSolidIcon />
          </IconButton>

          <IconButton
            className="Tool-Bar-Add-Shape"
            onClick={addStar}
            variant="ghost"
            size="medium"
          >
            <StarFilledIcon />
          </IconButton>
        </div>
      </div>

      <Settings canvas={canvas} />
    </div>
  )
}
