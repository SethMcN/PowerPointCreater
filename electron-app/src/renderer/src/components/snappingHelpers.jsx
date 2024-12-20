import React from 'react'
import { Line } from 'fabric'

const snappingDistance = 10

export const handleObjectMoving = (canvas, obj, guidelines, setGuidelines) => {
  const canvasWidth = canvas.width
  const canvasHeight = canvas.height

  const objLeft = obj.left
  const objTop = obj.top
  const objRight = obj.left + obj.width * obj.scaleX
  const objBottom = obj.top + obj.height * obj.scaleY

  const centerX = objLeft + (obj.width * obj.scaleX) / 2
  const centerY = objTop + (obj.height * obj.scaleY) / 2

  let newGuidelines = []

  clearGuidelines(canvas)

  let snapped = false

  if (Math.abs(objLeft) < snappingDistance) {
    obj.set({ left: 0 })
    if (!guidelineExists(canvas, 'vertical-left')) {
      const line = createVerticalGuideline(canvas, 0, 'vertical-left')
      newGuidelines.push(line)
      canvas.add(line)
    }
    snapped = true
  }

  if (Math.abs(objTop) < snappingDistance) {
    obj.set({ top: 0 })
    if (!guidelineExists(canvas, 'horizontal-top')) {
      const line = createHorizontalGuideline(canvas, 0, 'horizontal-top')
      newGuidelines.push(line)
      canvas.add(line)
    }
    snapped = true
  }

  if (Math.abs(objRight - canvasWidth) < snappingDistance) {
    obj.set({ left: canvasWidth - obj.width * obj.scaleX })
    if (!guidelineExists(canvas, 'vertical-right')) {
      const line = createVerticalGuideline(canvas, canvasWidth, 'vertical-right')
      newGuidelines.push(line)
      canvas.add(line)
    }
    snapped = true
  }

  if (!snapped) {
    clearGuidelines(canvas)
  } else {
    setGuidelines(newGuidelines)
  }

  canvas.renderAll()
}

export const clearGuidelines = (canvas) => {
  const lines = canvas.getObjects('line')
  lines.forEach((line) => canvas.remove(line))
}

export const guidelineExists = (canvas, id) => {
  const lines = canvas.getObjects('line')
  return lines.some((line) => line.id === id)
}

export const createVerticalGuideline = (canvas, x, id) => {
  return new Line([x + 0.5, 0, x + 0.5, canvas.height], {
    id,
    stroke: 'red',
    strokeWidth: 1,
    selectable: false,
    evented: false,
    strokeDashArray: [5, 5],
    opacity: 0.5
  })
}

export const createHorizontalGuideline = (canvas, y, id) => {
  return new Line([0, y + 0.5, canvas.width, y + 0.5], {
    id,
    stroke: 'red',
    strokeWidth: 1,
    selectable: false,
    evented: false,
    strokeDashArray: [5, 5],
    opacity: 0.5
  })
}
