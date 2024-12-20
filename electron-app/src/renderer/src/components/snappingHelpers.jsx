import { Line } from 'fabric'

const snappingDistance = 10

export const handleObjectMoving = (canvas, obj, setGuidelines) => {
  const canvasHight = canvas.height
  const canvasWidth = canvas.width

  const objLeft = obj.left
  const objTop = obj.top
  const objRight = objLeft + obj.width * obj.scaleX
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
    if (!guidelineExists(canvas, 'horizontal-left')) {
      const line = createHorizontalGuideline(canvas, 0, 'horizontal-left')
      newGuidelines.push(line)
      canvas.add(line)
    }
    snapped = true
  }

  if (Math.abs(centerY - canvasHight / 2) < snappingDistance) {
    obj.set({ top: canvas.height / 2 - (obj.height * obj.scaleY) / 2 })
    if (!guidelineExists(canvas, 'horizontal-center')) {
      const line = createHorizontalGuideline(canvas, canvas.height / 2, 'horizontal-center')
      newGuidelines.push(line)
      canvas.add(line)
    }
    snapped = true
  }

  if (Math.abs(centerX - canvasWidth / 2) < snappingDistance) {
    obj.set({ left: canvas.width / 2 - (obj.width * obj.scaleX) / 2 })
    if (!guidelineExists(canvas, 'vertical-center')) {
      const line = createVerticalGuideline(canvas, canvas.width / 2, 'vertical-center')
      newGuidelines.push(line)
      canvas.add(line)
    }
    snapped = true
  }

  if (!snapped) {
    clearGuidelines(canvas)
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
  return new Line([x, 0, x, canvas.height], {
    id,
    stroke: '#FF0000',
    strokeWidth: 1,
    selectable: false,
    evented: false,
    strokeDashArray: [5, 5]
  })
}

export const createHorizontalGuideline = (canvas, y, id) => {
  return new Line([0, y + 0.5, canvas.width, y + 0.5], {
    id,
    stroke: '#FF0000',
    strokeWidth: 1,
    selectable: false,
    evented: false,
    strokeDashArray: [5, 5],
    opacity: 0.5
  })
}
